import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import { KPICard } from '../components/KPICard';
import { ProgressBar } from '../components/ProgressBar';
import { getCountryContext } from '../api/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CountryDetailsScreen = ({ route, navigation }: any) => {
  const { country } = route.params;
  const { colors } = useTheme();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  
  const [contextData, setContextData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContext = async () => {
      // Use ISO2 for World Bank and ISO3 for WHO/RESTCountries
      const iso2 = country.countryInfo.iso2;
      const iso3 = country.countryInfo.iso3;
      
      if (!iso2 || !iso3) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCountryContext(iso2, iso3);
        setContextData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadContext();
  }, [country]);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.titleRow}>
        <Text style={[styles.header, { color: colors.text }]}>{country.country}</Text>
        <TouchableOpacity onPress={() => toggleBookmark(country)}>
          <MaterialCommunityIcons 
            name={isBookmarked(country.countryInfo.iso3) ? "bookmark" : "bookmark-outline"} 
            size={32} 
            color={colors.primary} 
          />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.sectionTitle, { color: colors.subText }]}>COVID-19 KPIs</Text>
      <View style={styles.kpiContainer}>
        <View style={styles.kpiRow}>
          <KPICard title="Total Cases" value={country.cases} color={colors.primary} />
          <KPICard title="Active Cases" value={country.active} color={colors.accent} />
        </View>
        <View style={styles.kpiRow}>
          <KPICard title="Recoveries" value={country.recovered} color="#28a745" />
          <KPICard title="Deaths" value={country.deaths} color="#dc3545" />
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.subText, marginTop: 24 }]}>Country Health Context</Text>
      
      {loading ? (
        <ProgressBar />
      ) : contextData ? (
        <View style={[styles.contextCard, { backgroundColor: colors.card, borderColor: colors.secondary }]}>
          
          <Text style={[styles.contextHeader, { color: colors.primary }]}>General Info</Text>
          <ContextRow label="Capital" value={contextData.restCountries?.capital?.[0] || 'N/A'} colors={colors} />
          <ContextRow label="Region" value={contextData.restCountries?.region || 'N/A'} colors={colors} />
          <ContextRow label="Population" value={contextData.restCountries?.population?.toLocaleString() || 'N/A'} colors={colors} />
          
          <Text style={[styles.contextHeader, { color: colors.primary, marginTop: 16 }]}>World Bank Data</Text>
          <ContextRow label="Life Expectancy" value={contextData.wb.lifeExpectancy ? `${contextData.wb.lifeExpectancy.toFixed(1)} years` : 'N/A'} colors={colors} />
          <ContextRow label="Health Exp. per capita" value={contextData.wb.healthExpenditure ? `$${contextData.wb.healthExpenditure.toFixed(2)}` : 'N/A'} colors={colors} />
          <ContextRow label="Hospital Beds (per 1k)" value={contextData.wb.hospitalBeds ? contextData.wb.hospitalBeds.toFixed(2) : 'N/A'} colors={colors} />

          <Text style={[styles.contextHeader, { color: colors.primary, marginTop: 16 }]}>WHO GHO Data</Text>
          <ContextRow label="Medical Doctors (per 10k)" value={contextData.who.medicalDoctors ? contextData.who.medicalDoctors.toFixed(2) : 'N/A'} colors={colors} />
          <ContextRow label="Clean Water Access (%)" value={contextData.who.cleanWater ? `${contextData.who.cleanWater.toFixed(1)}%` : 'N/A'} colors={colors} />
          <ContextRow label="Adult Mortality (per 1k)" value={contextData.who.mortalityRate ? contextData.who.mortalityRate.toFixed(2) : 'N/A'} colors={colors} />
          
        </View>
      ) : (
        <Text style={[styles.noData, { color: colors.subText }]}>No context data available</Text>
      )}
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const ContextRow = ({ label, value, colors }: any) => (
  <View style={styles.contextRow}>
    <Text style={[styles.contextLabel, { color: colors.subText }]}>{label}</Text>
    <Text style={[styles.contextValue, { color: colors.text }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  header: { fontSize: 28, fontWeight: 'bold', flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, marginLeft: 6 },
  kpiContainer: {},
  kpiRow: { flexDirection: 'row', justifyContent: 'space-between' },
  contextCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 }
  },
  contextHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  contextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  contextLabel: { fontSize: 14, flex: 1 },
  contextValue: { fontSize: 14, fontWeight: 'bold' },
  noData: { textAlign: 'center', marginTop: 20, fontStyle: 'italic' }
});
