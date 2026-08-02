import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const SettingsScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const renderSectionHeader = (title: string) => (
    <Text style={[styles.sectionHeader, { color: colors.primary }]}>{title}</Text>
  );

  const renderItem = (icon: any, title: string, onPress?: () => void, rightElement?: React.ReactNode) => (
    <TouchableOpacity 
      style={[styles.item, { backgroundColor: colors.card, borderBottomColor: colors.background }]} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.itemLeft}>
        <MaterialCommunityIcons name={icon} size={24} color={colors.text} style={styles.icon} />
        <Text style={[styles.itemText, { color: colors.text }]}>{title}</Text>
      </View>
      {rightElement || (onPress && <MaterialCommunityIcons name="chevron-right" size={24} color={colors.subText} />)}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      
      {renderSectionHeader("Appearance")}
      {renderItem("palette", "Theme", () => navigation.navigate("Theme"))}

      {renderSectionHeader("Notifications")}
      {renderItem(
        "bell-outline", 
        "Push Notifications", 
        undefined, 
        <Switch 
          value={notificationsEnabled} 
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: colors.subText, true: colors.primary }}
          thumbColor={colors.white}
        />
      )}

      {renderSectionHeader("About")}
      {renderItem("information-outline", "About Let's Observe", () => navigation.navigate("About"))}

      {renderSectionHeader("Resources")}
      {renderItem("email-outline", "Contact Support", () => {})}
      {renderItem("instagram", "Lexrunit on Instagram", () => {})}
      {renderItem("twitter", "Lexrunit on X", () => {})}
      {renderItem("linkedin", "Lexrunit on LinkedIn", () => {})}
      {renderItem("youtube", "Lexrunit on YouTube", () => {})}
      {renderItem("spotify", "Lexrunit on Spotify", () => {})}
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', marginLeft: 16, marginTop: 24, marginBottom: 8, textTransform: 'uppercase' },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1 },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 16 },
  itemText: { fontSize: 16 }
});
