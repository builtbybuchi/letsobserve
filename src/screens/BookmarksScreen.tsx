import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import { CountryRow } from '../components/CountryRow';

export const BookmarksScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const { bookmarks } = useBookmarks();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {bookmarks.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: colors.subText }}>No bookmarked countries yet.</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.countryInfo.iso3}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <CountryRow 
              country={item} 
              onPress={() => navigation.navigate('Countries', { screen: 'CountryDetails', params: { country: item } })} 
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
