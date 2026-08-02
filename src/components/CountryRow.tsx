import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface CountryRowProps {
  country: any;
  onPress: () => void;
}

export const CountryRow: React.FC<CountryRowProps> = ({ country, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.row, { backgroundColor: colors.card, borderColor: colors.background }]} 
      onPress={onPress}
    >
      <Image source={{ uri: country.countryInfo?.flag }} style={styles.flag} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]}>{country.country}</Text>
        <Text style={[styles.active, { color: colors.secondary }]}>Active Cases: {country.active.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  active: {
    fontSize: 14,
    marginTop: 4,
  },
  flag: {
    width: 40,
    height: 25,
    borderRadius: 4,
    marginRight: 12,
  }
});
