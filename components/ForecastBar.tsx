import { puntingScoreColors } from '@/constants';
import { HourlyWeatherData, PuntingScore } from '@/types/punting';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { generateMockData } from './WeatherGraph';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ForecastBarProps = {
  dateDelta: number;
  setDateDelta: (dateDelta: number) => void;
  dailyWeatherData?: Record<number, Record<number, HourlyWeatherData>>;
};

export function ForecastBar({
  dateDelta,
  setDateDelta,
  dailyWeatherData,
}: ForecastBarProps) {
  // Get a list of the best punting score for each of the next 8 days

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.tilesContainer}>
          {/* Buttons */}
          {Array.from({ length: 8 }).map((_, i) => {
            // Get date for each tile
            const dateObj = new Date();
            dateObj.setDate(dateObj.getDate() + i);
            let label;
            if (i === 0) {
              label = 'Today';
            } else {
              label = dateObj.toLocaleDateString(undefined, {
                weekday: 'short',
              });
            }
            return (
              <ForecastTile
                key={i}
                date={label}
                rating={
                  Math.max(
                    ...Object.values(
                      dailyWeatherData?.[i] ?? generateMockData()
                    ).map((hourly) => hourly?.puntingScore ?? 0)
                  ) as PuntingScore
                }
                dateDelta={dateDelta}
                setDateDelta={setDateDelta}
                index={i}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

type ForecastTileProps = {
  date: string;
  rating: PuntingScore;
  dateDelta: number;
  setDateDelta: (dateDelta: number) => void;
  index: number;
};

export function ForecastTile({
  date,
  rating,
  dateDelta,
  setDateDelta,
  index,
}: ForecastTileProps) {
  const isSelected = dateDelta === index;

  return (
    <Pressable
      onPress={() => setDateDelta(index)}
      style={[styles.tile, isSelected && styles.selectedTile]}
    >
      <Text style={styles.dateText}>{date}</Text>
      <Text style={[styles.ratingText, { color: puntingScoreColors[rating] }]}>
        {rating}/10
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_WIDTH * 0.9 * (1 / 4.5),
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  tilesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tile: {
    width: SCREEN_WIDTH * 0.9 * (1 / 4.7),
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTile: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
  },
  dateText: {
    fontSize: 20,
  },
  ratingText: {
    fontSize: 28,
  },
});
