// Fetch latest value for an indicator
const fetchIndicator = async (countryCode: string, indicatorCode: string) => {
  try {
    const res = await fetch(`https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicatorCode}?format=json&per_page=1`);
    const data = await res.json();
    if (data && data[1] && data[1].length > 0) {
      return data[1][0].value;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const getWorldBankContext = async (countryCode: string) => {
  // SP.DYN.LE00.IN = Life expectancy at birth, total (years)
  // SH.XPD.CHEX.PC.CD = Current health expenditure per capita (current US$)
  // SH.MED.BEDS.ZS = Hospital beds (per 1,000 people)
  
  const [lifeExpectancy, healthExpenditure, hospitalBeds] = await Promise.all([
    fetchIndicator(countryCode, 'SP.DYN.LE00.IN'),
    fetchIndicator(countryCode, 'SH.XPD.CHEX.PC.CD'),
    fetchIndicator(countryCode, 'SH.MED.BEDS.ZS')
  ]);

  return {
    lifeExpectancy,
    healthExpenditure,
    hospitalBeds
  };
};
