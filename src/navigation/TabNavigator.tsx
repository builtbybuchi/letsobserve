import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MonitorScreen } from '../screens/MonitorScreen';
import { CountryListScreen } from '../screens/CountryListScreen';
import { CountryDetailsScreen } from '../screens/CountryDetailsScreen';
import { BookmarksScreen } from '../screens/BookmarksScreen';
import { ChatScreen } from '../screens/ChatScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ICON_MAP: Record<string, string> = {
  Monitor: 'monitor-dashboard',
  Countries: 'earth',
  Bookmarks: 'bookmark-multiple-outline',
  Chat: 'robot-outline',
};

const CountryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CountryList" component={CountryListScreen} />
      <Stack.Screen name="CountryDetails" component={CountryDetailsScreen} />
    </Stack.Navigator>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.card }]}>  
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const iconName = ICON_MAP[route.name] || 'help';

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabItem}
          >
            <MaterialCommunityIcons
              name={iconName as any}
              size={24}
              color={isFocused ? colors.primary : colors.subText}
            />
            {isFocused && <View style={[styles.dot, { backgroundColor: colors.primary }]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Monitor" component={MonitorScreen} />
      <Tab.Screen name="Countries" component={CountryStack} />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 4,
  },
});

