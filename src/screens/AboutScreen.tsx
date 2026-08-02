import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const AboutScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={[styles.title, { color: colors.text }]}>Let's Observe</Text>
      <Text style={[styles.version, { color: colors.subText }]}>Version 1.0.0</Text>
      
      <Text style={[styles.description, { color: colors.text }]}>
        Let's Observe is a product made by Lexrunit. A healthcare technology company that produces software to improve quality of care and healthcare access.
      </Text>

      <View style={styles.links}>
        <TouchableOpacity>
          <Text style={[styles.link, { color: colors.primary }]}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 12 }}>
          <Text style={[styles.link, { color: colors.primary }]}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, paddingTop: 60 },
  logo: { width: 100, height: 100, borderRadius: 20, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  version: { fontSize: 14, marginBottom: 32 },
  description: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 40 },
  links: { alignItems: 'center' },
  link: { fontSize: 16, textDecorationLine: 'underline' }
});
