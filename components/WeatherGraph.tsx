import { HourlyWeatherData } from '@/types/punting';
import { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { LineGraph } from 'react-native-graph';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type DataType = 'temperature' | 'wind' | 'rain';

// Generate realistic mock data for the graph
const generateMockData = (): Record<number, HourlyWeatherData> => {
  const mockData: Record<number, HourlyWeatherData> = {};

  // Temperature curve - warmer during midday, cooler at night
  const tempBaseline = 15;
  const tempVariation = 10;

  // Wind pattern - generally picks up during the day
  const windBaseline = 5;
  const windVariation = 12;

  // Rain probability - simulate a weather pattern
  const rainPattern = [
    0.05, 0.05, 0.1, 0.1, 0.2, 0.3, 0.4, 0.3, 0.2, 0.1, 0.05, 0, 0, 0, 0.05,
    0.1, 0.2, 0.3, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05,
  ];

  for (let hour = 0; hour < 24; hour++) {
    // Temperature follows a sine wave pattern peaking at midday
    const hourTemp =
      tempBaseline + tempVariation * Math.sin(((hour - 5) / 24) * Math.PI * 2);

    // Wind has a different pattern, stronger in afternoon
    const hourWind =
      windBaseline +
      (hour > 10 && hour < 18
        ? windVariation * (0.5 + Math.random() * 0.5)
        : windVariation * Math.random() * 0.3);

    // Rain chance follows the pattern defined above
    const hourRain = rainPattern[hour] * (0.8 + Math.random() * 0.4);

    mockData[hour] = {
      temperature: Math.round(hourTemp * 10) / 10,
      wind: Math.round(hourWind * 10) / 10,
      rainPercent: Math.min(1, Math.max(0, hourRain)),
      puntingScore: 7, // Not used in the graph
    };
  }
  return mockData;
};

export function WeatherGraph() {
  const [mockGraphData, setMockGraphData] = useState<
    Record<number, HourlyWeatherData>
  >({});
  const [selectedTab, setSelectedTab] = useState<DataType>('temperature');

  // Generate different mock data based on the selected tab
  useEffect(() => {
    // Generate new mock data whenever the tab changes
    // This makes the graph more dynamic and interesting when switching tabs
    setMockGraphData(generateMockData());
  }, [selectedTab]);

  // Format data for LineGraph
  const getGraphData = () => {
    if (Object.keys(mockGraphData).length === 0) return [];

    return Object.entries(mockGraphData)
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
            value = value * 100; // Convert to percentage for display
            break;
        }
        return {
          date: new Date(2025, 4, 22, parseInt(hour)),
          value: value,
        };
      });
  };

  // Get the range for the graph
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

  // Get color for graph based on data type
  const getGraphColor = (): string => {
    switch (selectedTab) {
      case 'temperature':
        return '#FF6347'; // Tomato red
      case 'wind':
        return '#4682B4'; // Steel blue
      case 'rain':
        return '#0000FF'; // Blue
      default:
        return '#000';
    }
  };

  // Get unit label based on selected tab
  const getUnitLabel = (): string => {
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
      {/* Title */}
      <Text style={styles.title}>24-Hour Weather Forecast</Text>

      {/* Tab selection */}
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

      {/* Graph */}
      <View style={styles.graphContainer}>
        {Object.keys(mockGraphData).length > 0 ? (
          <View style={styles.graph}>
            {' '}
            {/* Y-axis vertical bar */} {/* Grid Lines */}
            <View style={styles.gridContainer}>
              {' '}
              {/* Horizontal grid lines */}
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
              {/* Vertical grid lines */}
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
              <View style={styles.yAxisLine}></View>{' '}
              {/* Render labels for all values including 0 */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const max = getGraphRange()?.y.max || 100;
                const value = max * ratio;

                return (
                  <View
                    key={i}
                    style={[styles.yAxisTick, { bottom: `${ratio * 100}%` }]}
                  >
                    <Text style={styles.yAxisLabel}>{Math.round(value)}</Text>
                  </View>
                );
              })}
            </View>{' '}
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
            />{' '}
            {/* X-axis with hour markers */}
            <View style={styles.xAxis}>
              <View style={styles.xAxisLine}></View>{' '}
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
    bottom: 25 /* Match the graph and y-axis bottom spacing */,
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
    fontSize: 18,
    fontWeight: '500',
  },
  selectedTabText: {
    fontWeight: 'bold',
  },
  graphContainer: {
    flex: 0.95,
    padding: 10,
  },
  graph: {
    flex: 1,
    position: 'relative',
    paddingBottom: 25 /* Space for x-axis */,
  },
  lineGraph: {
    position: 'absolute',
    top: 0,
    left: 45,
    right: 0,
    bottom: 25 /* Match the paddingBottom of graph */,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  yAxis: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 25 /* Match the graph padding bottom */,
    width: 45 /* Increased to match new left margin */,
    zIndex: 10,
  },
  yAxisLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 0 /* Hide the y-axis line by setting width to 0 */,
    backgroundColor: '#ccc',
  },
  yAxisTick: {
    position: 'absolute',
    right: 0,
    width: 25,
    height: 0 /* Hide the tick line by setting height to 0 */,
    backgroundColor: '#ccc',
  },
  yAxisLabel: {
    position: 'absolute',
    right: 30,
    fontSize: 12,
    color: '#555',
  },
  xAxis: {
    position: 'absolute',
    left: 45 /* Increased from 35 to 45 to prevent overlap with y-axis labels */,
    right: 0,
    bottom: 0,
    height: 25,
    zIndex: 10,
  },
  xAxisLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 0 /* Hide the x-axis line by setting height to 0 */,
    backgroundColor: '#ccc',
  },
  xAxisTick: {
    position: 'absolute',
    top: 0,
    height: 0 /* Hide the tick line by setting height to 0 */,
    width: 1,
    backgroundColor: '#ccc',
  },
  xAxisLabel: {
    position: 'absolute',
    top: 5,
    fontSize: 12 /* Increased from 8 to 12 */,
    color: '#555',
    width: 30 /* Set fixed width to prevent layout issues */,
    textAlign: 'center',
    left: -15 /* Center the label */,
  },
});
