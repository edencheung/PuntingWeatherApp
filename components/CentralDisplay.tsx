import { puntingScoreColors } from '@/constants';
import { PuntingScore } from '@/types/punting';
import { Dimensions, Text, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type CentralDisplayProps = {
  date?: string;
  bestTime?: string;
  puntingScore?: PuntingScore;
  dailySummary?: string;
  weatherConditionsSummary?: string;
};

export function CentralDisplay({
  date = '11th May',
  bestTime = '1:48 pm',
  puntingScore = 10,
  dailySummary = 'A great day for punting!',
  weatherConditionsSummary = '22-25°C | Calm winds | Sunny',
}: CentralDisplayProps) {
  return (
    <View
      style={{
        height: SCREEN_HEIGHT * 0.25,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 0,
        backgroundColor: 'transparent',
      }}
    >
      <Text style={{ fontSize: 24, color: 'black' }}>
        {date} | Best time {bestTime}
      </Text>
      <Text style={{ fontSize: 60, color: puntingScoreColors[puntingScore] }}>
        {puntingScore}/10
      </Text>
      <Text style={{ fontSize: 24, color: 'black' }}>{dailySummary}</Text>
      <Text style={{ fontSize: 24, color: 'black' }}>
        {weatherConditionsSummary}
      </Text>
    </View>
  );
}
