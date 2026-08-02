import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface KPICardProps {
  title: string;
  value: number | string;
  color?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, color }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: color || colors.secondary }]}>
      <Text style={[styles.title, { color: colors.subText }]}>{title}</Text>
      <Text style={[styles.value, { color: color || colors.text }]}>{value.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    margin: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
