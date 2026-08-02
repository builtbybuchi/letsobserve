import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const ThemeScreen = () => {
  const { theme, setTheme, colors } = useTheme();

  const ThemeOption = ({ label, selected, onPress }: any) => (
    <TouchableOpacity style={[styles.option, { backgroundColor: colors.card, borderBottomColor: colors.background }]} onPress={onPress}>
      <Text style={[styles.optionText, { color: colors.text }]}>{label}</Text>
      <View style={[styles.radio, { borderColor: colors.primary }]}>
        {selected && <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemeOption label="System Default" selected={theme === 'system'} onPress={() => setTheme('system')} />
      <ThemeOption label="Light" selected={theme === 'light'} onPress={() => setTheme('light')} />
      <ThemeOption label="Dark" selected={theme === 'dark'} onPress={() => setTheme('dark')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16 },
  option: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  optionText: { fontSize: 16 },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioInner: { width: 12, height: 12, borderRadius: 6 }
});
