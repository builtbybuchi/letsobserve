import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ChatScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MaterialCommunityIcons name="robot-outline" size={64} color={colors.secondary} />
      <Text style={[styles.text, { color: colors.text }]}>AI Chat coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, marginTop: 16, fontWeight: '500' }
});
