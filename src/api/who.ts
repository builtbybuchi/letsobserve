const fetchWHOIndicator = async (countryCode: string, indicatorCode: string) => {
  // WHO GHO API (Athena) using OData
  // We use the SpatialDim eq 'COUNTRY_CODE' filter. The countryCode should be iso3.
  try {
    // Note: WHO uses ISO-3 codes for countries
    const res = await fetch(`https://ghoapi.azureedge.net/api/${indicatorCode}?$filter=SpatialDim eq '${countryCode}'&$top=1&$orderby=TimeDim desc`);
    const data = await res.json();
    if (data && data.value && data.value.length > 0) {
      return data.value[0].NumericValue;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const getWHOContext = async (iso3Code: string) => {
  // HWf_0001 = Medical doctors (per 10 000 population)
  // WASH_WATER_SAFELYMANAGED = Proportion of population using safely managed drinking-water services (%)
  // WHOSIS_000004 = Adult mortality rate (probability of dying between 15 and 60 years per 1000 population)
  
  const [medicalDoctors, cleanWater, mortalityRate] = await Promise.all([
    fetchWHOIndicator(iso3Code, 'HWF_0001'),
    fetchWHOIndicator(iso3Code, 'WASH_WATER_SAFELYMANAGED'),
    fetchWHOIndicator(iso3Code, 'WHOSIS_000004')
  ]);

  return {
    medicalDoctors,
    cleanWater,
    mortalityRate
  };
};
