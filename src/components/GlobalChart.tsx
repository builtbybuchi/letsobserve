import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../theme/ThemeContext';

interface GlobalChartProps {
  historicalData: any; // { cases: { date: count, ... }, ... }
}

export const GlobalChart: React.FC<GlobalChartProps> = ({ historicalData }) => {
  const { colors, isDark } = useTheme();

  if (!historicalData || !historicalData.cases) {
    return (
      <View style={[styles.container, { backgroundColor: colors.card }]}>
        <Text style={{ color: colors.text }}>Loading chart data...</Text>
      </View>
    );
  }

  const cases = historicalData.cases;
  // Get labels (dates) and data points
  // Filter to show maybe every 5th day to not overcrowd the x-axis
  const keys = Object.keys(cases);
  const dataPoints = Object.values(cases) as number[];
  
  const labels = keys.filter((_, i) => i % 5 === 0).map(d => {
    const [month, day] = d.split('/');
    return `${month}/${day}`;
  });
  
  const filteredData = keys.filter((_, i) => i % 5 === 0).map(k => cases[k]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: filteredData,
        color: (opacity = 1) => `rgba(10, 1, 249, ${opacity})`, // accent color #0A01F9
        strokeWidth: 2 // optional
      }
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => colors.subText,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: colors.secondary
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>Global Cases (Last 30 Days)</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 32} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignSelf: 'center'
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 8
  }
});
