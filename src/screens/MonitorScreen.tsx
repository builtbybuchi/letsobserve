import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { getGlobalOverview, getTopActiveCountries } from '../api/client';
import { KPICard } from '../components/KPICard';
import { GlobalChart } from '../components/GlobalChart';
import { CountryRow } from '../components/CountryRow';

export const MonitorScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [kpi, setKpi] = useState<any>(null);
  const [historical, setHistorical] = useState<any>(null);
  const [topCountries, setTopCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [overviewData, topData] = await Promise.all([
          getGlobalOverview(),
          getTopActiveCountries()
        ]);
        setKpi(overviewData.kpi);
        setHistorical(overviewData.historical);
        setTopCountries(topData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      
      {kpi && (
        <View style={styles.kpiContainer}>
          <View style={styles.kpiRow}>
            <KPICard title="Total Cases" value={kpi.cases} color={colors.primary} />
            <KPICard title="Active Cases" value={kpi.active} color={colors.accent} />
          </View>
          <View style={styles.kpiRow}>
            <KPICard title="Recoveries" value={kpi.recovered} color="#28a745" />
            <KPICard title="Deaths" value={kpi.deaths} color="#dc3545" />
          </View>
        </View>
      )}

      <GlobalChart historicalData={historical} />

      <Text style={[styles.sectionHeader, { color: colors.text }]}>Top 10 Active Cases</Text>
      <View style={styles.listContainer}>
        {topCountries.map((c, i) => (
          <CountryRow 
            key={i} 
            country={c} 
            onPress={() => navigation.navigate('Countries', { screen: 'CountryDetails', params: { country: c } })} 
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  kpiContainer: {
    paddingHorizontal: 10,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  listContainer: {
    paddingBottom: 24,
  }
});
