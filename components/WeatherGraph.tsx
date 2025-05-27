import { HourlyWeatherData, PuntingScore } from '@/types/punting';
import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { LineGraph } from 'react-native-graph';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type WeatherDataType = 'temperature' | 'wind' | 'rain';

export const generateMockData = (): Record<number, HourlyWeatherData> => {
  const mockData: Record<number, HourlyWeatherData> = {};
  const tempBaseline = 15;
  const tempVariation = 10;
  const windBaseline = 5;
  const windVariation = 12;
  const rainPattern = [
    0.05, 0.05, 0.1, 0.1, 0.2, 0.3, 0.4, 0.3, 0.2, 0.1, 0.05, 0, 0, 0, 0.05,
    0.1, 0.2, 0.3, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05,
  ];

  for (let hour = 0; hour < 24; hour++) {
    const hourTemp =
      tempBaseline + tempVariation * Math.sin(((hour - 5) / 24) * Math.PI * 2);

    const hourWind =
      windBaseline +
      (hour > 10 && hour < 18
        ? windVariation * (0.5 + Math.random() * 0.5)
        : windVariation * Math.random() * 0.3);

    const hourRain = rainPattern[hour] * (0.8 + Math.random() * 0.4);

    mockData[hour] = {
      temperature: Math.round(hourTemp * 10) / 10,
      wind: Math.round(hourWind * 10) / 10,
      rainPercent: Math.min(1, Math.max(0, hourRain)),
      puntingScore: Math.round(Math.random() * 10) as PuntingScore,
    };
  }
  return mockData;
};

export function WeatherGraph({
  hourlyWeatherData = generateMockData(),
}: {
  hourlyWeatherData?: Record<number, HourlyWeatherData>;
}) {
  const [selectedTab, setSelectedTab] =
    useState<WeatherDataType>('temperature');

  const getGraphData = () => {
    if (Object.keys(hourlyWeatherData).length === 0) return [];

    return Object.entries(hourlyWeatherData)
      .sort(([hourA], [hourB]) => parseInt(hourA) - parseInt(hourB))
      .map(([hour, data]) => {
        let value = 0;
        switch (selectedTab) {
          case 'temperature':
            value = data.temperature || 0;
            break;
          case 'wind':
            value = data.wind || 0;
            break;
          case 'rain':
            value = data.rainPercent || 0;
            value = value * 100;
            break;
        }
        return {
          date: new Date(2025, 4, 22, parseInt(hour)),
          value: value,
        };
      });
  };

  const getGraphRange = () => {
    const data = getGraphData();
    if (data.length === 0) return undefined;

    return {
      y: {
        min: 0,
        max:
          selectedTab === 'rain'
            ? 100
            : Math.ceil(Math.max(...data.map((p) => p.value)) * 1.1),
      },
    };
  };

  const getGraphColor = (): string => {
    switch (selectedTab) {
      case 'temperature':
        return '#FF6347';
      case 'wind':
        return '#4682B4';
      case 'rain':
        return '#0000FF';
      default:
        return '#000';
    }
  };

  const getUnits = (): string => {
    switch (selectedTab) {
      case 'temperature':
        return '°C';
      case 'wind':
        return 'mph';
      case 'rain':
        return '%';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>24-Hour Weather Forecast</Text> */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tab,
            selectedTab === 'temperature' && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab('temperature')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'temperature' && styles.selectedTabText,
            ]}
          >
            Temperature
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === 'wind' && styles.selectedTab]}
          onPress={() => setSelectedTab('wind')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'wind' && styles.selectedTabText,
            ]}
          >
            Wind
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === 'rain' && styles.selectedTab]}
          onPress={() => setSelectedTab('rain')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'rain' && styles.selectedTabText,
            ]}
          >
            Rain
          </Text>
        </Pressable>
      </View>

      <View style={styles.graphContainer}>
        {Object.keys(hourlyWeatherData).length > 0 ? (
          <View style={styles.graph}>
            <View style={styles.gridContainer}>
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <View
                  key={`h-${i}`}
                  style={[
                    styles.gridLine,
                    styles.horizontalLine,
                    { bottom: `${ratio * 100}%` },
                  ]}
                />
              ))}
              {[0, 6, 12, 18, 24].map((_, i) => (
                <View
                  key={`v-${i}`}
                  style={[
                    styles.gridLine,
                    styles.verticalLine,
                    { left: `${i * 25}%` },
                  ]}
                />
              ))}
            </View>
            <View style={styles.yAxis}>
              <View style={styles.yAxisLine} />
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const max = getGraphRange()?.y.max || 100;
                const value = max * ratio;
                return (
                  <View
                    key={i}
                    style={[styles.yAxisTick, { bottom: `${ratio * 100}%` }]}
                  >
                    <Text style={styles.yAxisLabel}>
                      {Math.round(value) + getUnits()}
                    </Text>
                  </View>
                );
              })}
            </View>
            <LineGraph
              style={styles.lineGraph}
              points={getGraphData()}
              animated={false}
              color={getGraphColor()}
              gradientFillColors={[
                `${getGraphColor()}80`,
                `${getGraphColor()}10`,
              ]}
              lineThickness={3}
              range={getGraphRange()}
            />
            <View style={styles.xAxis}>
              <View style={styles.xAxisLine} />
              {[0, 6, 12, 18, 24].map((hour, i) => (
                <View
                  key={i}
                  style={[styles.xAxisTick, { left: `${i * 25}%` }]}
                >
                  <Text style={styles.xAxisLabel}>
                    {hour.toString().padStart(2, '0')}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading data...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.43,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    position: 'absolute',
    left: 45,
    right: 0,
    top: 0,
    bottom: 25,
    zIndex: 1,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  horizontalLine: {
    left: 0,
    right: 0,
    height: 1,
  },
  verticalLine: {
    top: 0,
    bottom: 0,
    width: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Quicksand-Bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedTab: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Quicksand-Bold',
  },
  selectedTabText: {
    fontWeight: 'bold',
    fontFamily: 'Quicksand-Bold',
  },
  graphContainer: {
    flex: 0.95,
    padding: 10,
  },
  graph: {
    flex: 1,
    position: 'relative',
    paddingBottom: 25,
  },
  lineGraph: {
    position: 'absolute',
    top: 0,
    left: 45,
    right: 0,
    bottom: 25,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  yAxis: {
    position: 'absolute',
    left: 10,
    height: '100%',
    bottom: 32,
    width: 45,
    zIndex: 10,
  },
  yAxisLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 0,
    backgroundColor: '#ccc',
  },
  yAxisTick: {
    position: 'absolute',
    right: 0,
    width: 25,
    height: 0,
    backgroundColor: '#ccc',
  },
  yAxisLabel: {
    position: 'absolute',
    right: 20,
    fontSize: 13,
    width: 50,
    textAlign: 'right',
    color: '#555',
    fontFamily: 'Quicksand-Bold',
  },
  xAxis: {
    position: 'absolute',
    left: 45,
    right: 0,
    bottom: -10,
    height: 25,
    zIndex: 10,
  },
  xAxisLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 0,
    backgroundColor: '#ccc',
  },
  xAxisTick: {
    position: 'absolute',
    top: 0,
    height: 0,
    width: 1,
    backgroundColor: '#ccc',
  },
  xAxisLabel: {
    position: 'absolute',
    top: 5,
    fontSize: 15,
    wordWrap: 'overflow',
    color: '#555',
    width: 30,
    textAlign: 'center',
    left: -15,
    fontFamily: 'Quicksand-Bold',
  },
});
