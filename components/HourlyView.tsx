import { puntingScoreEmojis } from '@/constants';
import { HourlyWeatherData } from '@/types/punting';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { generateMockData } from './WeatherGraph';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function HourlyView({
  hourlyWeatherData = generateMockData(),
}: {
  hourlyWeatherData?: Record<number, HourlyWeatherData>;
}) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        {Object.entries(hourlyWeatherData).map(([key, value]) => {
          return (
            <HourlyTile
              key={key}
              hour={parseInt(key)}
              puntingScore={value.puntingScore}
              rainPercent={value.rainPercent}
              temperature={value.temperature}
              wind={value.wind}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

function HourlyTile(
  props: HourlyWeatherData & {
    hour: number;
  }
) {
  // Format hour with leading zero if it's a single digit
  const formattedHour =
    (props.hour < 10 ? `0${props.hour}` : `${props.hour}`) + ':00';

  return (
    <View style={styles.tile}>
      <Text style={styles.hourText}>{formattedHour}</Text>
      <Image
        style={{ height: '25%', resizeMode: 'contain' }}
        source={puntingScoreEmojis[props.puntingScore]}
      />
      <Text style={styles.tileText}>{props.puntingScore}/10</Text>
      <Text style={styles.tileText}>
        {Math.round(props.rainPercent * 100)}%💧
      </Text>
      <Text style={styles.tileText}>{props.temperature}°C</Text>
      <Text style={styles.tileText}>{props.wind}mph</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 5,
    borderRadius: 10,
    margin: 30,
    display: 'flex',
  },
  tile: {
    margin: 5,
    width: SCREEN_WIDTH * 0.9 * (1 / 5.35),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '90%',
    paddingVertical: 10,
  },
  hourText: {
    fontSize: 20,
  },
  tileText: {
    fontSize: 20,
  },
});
