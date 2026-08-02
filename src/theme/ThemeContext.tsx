import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from './colors';

export type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  colors: {
    background: string;
    card: string;
    text: string;
    subText: string;
    primary: string;
    secondary: string;
    accent: string;
  };
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeType>('system');

  useEffect(() => {
    AsyncStorage.getItem('app-theme').then((savedTheme) => {
      if (savedTheme) {
        setThemeState(savedTheme as ThemeType);
      }
    });
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    AsyncStorage.setItem('app-theme', newTheme);
  };

  const isDark = theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';

  const currentColors = {
    background: isDark ? colors.darkBackground : colors.lightBackground,
    card: isDark ? colors.darkCard : colors.lightCard,
    text: isDark ? colors.textDark : colors.textLight,
    subText: isDark ? colors.subTextDark : colors.subTextLight,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, colors: currentColors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
