import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { getCountries } from '../api/client';
import { CountryRow } from '../components/CountryRow';

export const CountryListScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [countries, setCountries] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = countries.filter(c => c.country.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        style={[styles.search, { backgroundColor: colors.card, color: colors.text, borderColor: colors.secondary }]}
        placeholder="Search countries..."
        placeholderTextColor={colors.subText}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.countryInfo.iso3 || item.country}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <CountryRow 
            country={item} 
            onPress={() => navigation.navigate('CountryDetails', { country: item })} 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  search: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  }
});
