import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <TouchableOpacity onPress={() => navigation.navigate('SettingsStack')}>
        <MaterialCommunityIcons name="cog" size={28} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 }
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    resizeMode: 'contain'
  }
});
