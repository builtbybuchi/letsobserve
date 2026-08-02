export const getGlobalKPIs = async () => {
  const res = await fetch('https://disease.sh/v3/covid-19/all');
  return res.json();
};

export const getGlobalHistorical = async () => {
  const res = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30');
  return res.json();
};

export const getCountriesData = async () => {
  const res = await fetch('https://disease.sh/v3/covid-19/countries');
  return res.json();
};

export const getTopActiveCountries = async () => {
  const res = await fetch('https://disease.sh/v3/covid-19/countries?sort=active');
  const data = await res.json();
  return data.slice(0, 10);
};

export const getCountryCovidData = async (countryCode: string) => {
  const res = await fetch(`https://disease.sh/v3/covid-19/countries/${countryCode}`);
  return res.json();
};
