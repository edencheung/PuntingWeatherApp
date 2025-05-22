import { puntingScoreEmojis } from '@/constants';
import { PuntingScore } from '@/types/punting';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function HourlyView() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        <HourlyTile
          puntingScore={7 as PuntingScore}
          hour={3}
          wind={0}
          rainPercent={0}
          temperature={0}
        />
        <HourlyTile
          puntingScore={7 as PuntingScore}
          hour={3}
          wind={0}
          rainPercent={0}
          temperature={0}
        />
        <HourlyTile
          puntingScore={7 as PuntingScore}
          hour={3}
          wind={0}
          rainPercent={0}
          temperature={0}
        />
        <HourlyTile
          puntingScore={7 as PuntingScore}
          hour={3}
          wind={0}
          rainPercent={0}
          temperature={0}
        />
        <HourlyTile
          puntingScore={7 as PuntingScore}
          hour={3}
          wind={0}
          rainPercent={0}
          temperature={0}
        />
        <HourlyTile
          puntingScore={7 as PuntingScore}
          hour={3}
          wind={0}
          rainPercent={0}
          temperature={0}
        />
      </ScrollView>
    </View>
  );
}

function HourlyTile(props: {
  hour: number;
  puntingScore: PuntingScore;
  wind: number;
  rainPercent: number;
  temperature: number;
}) {
  return (
    <View style={styles.tile}>
      <Text style={styles.hourText}>{props.hour}</Text>
      <Image
        style={{ height: '25%', resizeMode: 'contain' }}
        source={puntingScoreEmojis[props.puntingScore]}
      />
      <Text style={styles.tileText}>{props.puntingScore}/10</Text>
      <Text style={styles.tileText}>{props.rainPercent}%💧</Text>
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
