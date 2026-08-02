import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
  RESTCOUNTRIES_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

// Cloudflare Workers Cache API for 24-hour edge caching
async function fetchCached(url: string, init?: RequestInit, timeoutMs = 8000) {
  const cache = caches.default;
  const cacheKey = new Request(url, { method: init?.method || 'GET' });
  let response = await cache.match(cacheKey);

  if (!response) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      response = await fetch(url, { ...init, signal: controller.signal, redirect: 'follow' });
      clearTimeout(timeoutId);
      if (response.ok) {
        response = new Response(response.body, response);
        response.headers.set('Cache-Control', 's-maxage=86400'); // 1 day
        await cache.put(cacheKey, response.clone());
      }
    } catch (e) {
      clearTimeout(timeoutId);
      console.error(`Failed to fetch ${url}`, e);
      return null;
    }
  }
  
  if (!response) return null;
  
  try {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (e) {
    console.error(`Failed to parse JSON for ${url}`, e);
    return null;
  }
}

app.get('/api/global', async (c) => {
  const [kpi, historical] = await Promise.all([
    fetchCached('https://disease.sh/v3/covid-19/all'),
    fetchCached('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
  ]);
  return c.json({ kpi, historical });
});

app.get('/api/countries', async (c) => {
  const data = await fetchCached('https://disease.sh/v3/covid-19/countries');
  return c.json(data);
});

app.get('/api/countries/top', async (c) => {
  const data = await fetchCached('https://disease.sh/v3/covid-19/countries?sort=active');
  return c.json((data as any[]).slice(0, 10));
});

app.get('/api/context/:iso2/:iso3', async (c) => {
  const { iso2, iso3 } = c.req.param();
  const apiKey = c.env.RESTCOUNTRIES_API_KEY;

  // We fetch RESTCountries, WB, and WHO in parallel to aggregate on the edge!
  const [restCountriesResp, lifeExp, healthExp, beds, medicalDocs, cleanWater, mortality] = await Promise.all([
    fetchCached(`https://api.restcountries.com/countries/v5?q=${iso3}`, {
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {}
    }),
    fetchCached(`https://api.worldbank.org/v2/country/${iso2}/indicator/SP.DYN.LE00.IN?format=json&per_page=1`),
    fetchCached(`https://api.worldbank.org/v2/country/${iso2}/indicator/SH.XPD.CHEX.PC.CD?format=json&per_page=1`),
    fetchCached(`https://api.worldbank.org/v2/country/${iso2}/indicator/SH.MED.BEDS.ZS?format=json&per_page=1`),
    fetchCached(`https://ghoapi.azureedge.net/api/HWF_0001?$filter=SpatialDim eq '${iso3}'&$top=1&$orderby=TimeDim desc`),
    fetchCached(`https://ghoapi.azureedge.net/api/WASH_WATER_SAFELYMANAGED?$filter=SpatialDim eq '${iso3}'&$top=1&$orderby=TimeDim desc`),
    fetchCached(`https://ghoapi.azureedge.net/api/WHOSIS_000004?$filter=SpatialDim eq '${iso3}'&$top=1&$orderby=TimeDim desc`)
  ]);

  const extractWB = (data: any) => data && data[1] && data[1].length > 0 ? data[1][0].value : null;
  const extractWHO = (data: any) => data && data.value && data.value.length > 0 ? data.value[0].NumericValue : null;

  let restCountryData = null;
  if (restCountriesResp && restCountriesResp.data && Array.isArray(restCountriesResp.data)) {
    const match = restCountriesResp.data.find((c: any) => c.codes?.alpha_3 === iso3) || restCountriesResp.data[0];
    if (match) {
      restCountryData = {
        capital: match.capitals?.[0]?.name ? [match.capitals[0].name] : undefined,
        region: match.region,
        population: match.population
      };
    }
  }

  return c.json({
    restCountries: restCountryData,
    wb: {
      lifeExpectancy: extractWB(lifeExp),
      healthExpenditure: extractWB(healthExp),
      hospitalBeds: extractWB(beds)
    },
    who: {
      medicalDoctors: extractWHO(medicalDocs),
      cleanWater: extractWHO(cleanWater),
      mortalityRate: extractWHO(mortality)
    }
  });
});

export default app;
