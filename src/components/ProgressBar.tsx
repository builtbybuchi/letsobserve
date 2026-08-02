import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const ProgressBar = ({ progress = 0 }: { progress?: number }) => {
  const { colors } = useTheme();
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fake loading animation since we don't have real progress
    Animated.timing(widthAnim, {
      toValue: 100,
      duration: 8000, // matches timeout
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.subText }]}>Loading Health Context...</Text>
      <View style={[styles.barBackground, { backgroundColor: colors.card }]}>
        <Animated.View
          style={[
            styles.barFill,
            {
              backgroundColor: colors.primary,
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              })
            }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20, paddingHorizontal: 16 },
  text: { marginBottom: 8, fontSize: 14, fontStyle: 'italic', textAlign: 'center' },
  barBackground: { height: 8, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 }
});
