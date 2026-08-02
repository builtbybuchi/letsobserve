import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeContext';
import { BookmarkProvider } from './src/contexts/BookmarkContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <BookmarkProvider>
          <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </SafeAreaView>
        </BookmarkProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}