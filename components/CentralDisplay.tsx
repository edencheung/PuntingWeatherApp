import { puntingScoreColors } from '@/constants';
import { PuntingScore } from '@/types/punting';
import { Dimensions, Text, View, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export type CentralDisplayProps = {
  date?: string;
  bestTime?: string;
  puntingScore?: PuntingScore;
  dailySummary?: string;
  weatherConditionsSummary?: string;
  fontColor?: 'white' | 'black';
};

export function CentralDisplay({
  date = '11th May',
  bestTime = '1:48 pm',
  puntingScore = 10,
  dailySummary = 'A great day for punting!',
  weatherConditionsSummary = '22-25°C | Calm winds | Sunny',
  fontColor = 'black',
}: CentralDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: fontColor }]}>
        {date} | Best time {bestTime}
      </Text>
      <Text
        style={[
          styles.score,
          { color: puntingScoreColors[puntingScore], fontFamily: 'CherryBomb-Regular' },
        ]}
      >
        {puntingScore}/10
      </Text>
      <Text style={[styles.text, { color: fontColor }]}>{dailySummary}</Text>
      <Text style={[styles.subtext, { color: fontColor }]}>
        {weatherConditionsSummary}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.25,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
    marginBottom: -17,
  },
  subtext: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    marginTop: 19,
  },
  score: {
    fontSize: 70,
    fontFamily: 'CherryBomb-Regular',
    marginBottom: -7,
  },
});
