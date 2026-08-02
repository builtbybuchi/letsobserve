import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BookmarkContextType {
  bookmarks: any[];
  toggleBookmark: (country: any) => void;
  isBookmarked: (iso3: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
});

export const BookmarkProvider = ({ children }: any) => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('@bookmarks').then(data => {
      if (data) setBookmarks(JSON.parse(data));
    });
  }, []);

  const toggleBookmark = async (country: any) => {
    const iso3 = country.countryInfo.iso3;
    let newBookmarks;
    if (bookmarks.find(c => c.countryInfo.iso3 === iso3)) {
      newBookmarks = bookmarks.filter(c => c.countryInfo.iso3 !== iso3);
    } else {
      newBookmarks = [...bookmarks, country];
    }
    setBookmarks(newBookmarks);
    await AsyncStorage.setItem('@bookmarks', JSON.stringify(newBookmarks));
  };

  const isBookmarked = (iso3: string) => !!bookmarks.find(c => c.countryInfo.iso3 === iso3);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
