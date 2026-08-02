import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ThemeScreen } from '../screens/ThemeScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { Header } from '../components/Header';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header />,
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      
      {/* Settings Stack */}
      <Stack.Screen name="SettingsStack" component={SettingsStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

// Settings internal stack (with its own header for sub-pages like back button)
const Settings = createNativeStackNavigator();
const SettingsStack = () => {
  const { colors } = useTheme();
  return (
    <Settings.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Settings.Screen name="SettingsList" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Settings.Screen name="Theme" component={ThemeScreen} options={{ title: 'Appearance' }} />
      <Settings.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
    </Settings.Navigator>
  );
};
