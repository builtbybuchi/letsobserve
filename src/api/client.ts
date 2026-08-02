const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8787';

export const getGlobalOverview = async () => {
  const res = await fetch(`${API_URL}/api/global`);
  return res.json();
};

export const getCountries = async () => {
  const res = await fetch(`${API_URL}/api/countries`);
  return res.json();
};

export const getTopActiveCountries = async () => {
  const res = await fetch(`${API_URL}/api/countries/top`);
  return res.json();
};

export const getCountryContext = async (iso2: string, iso3: string) => {
  const res = await fetch(`${API_URL}/api/context/${iso2}/${iso3}`);
  return res.json();
};
