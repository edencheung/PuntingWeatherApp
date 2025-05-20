import { puntingScoreColors } from "@/constants";
import { PuntingScore } from "@/types/punting";
import { Dimensions, ScrollView, Text, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function ForecastBar() {
  return (
    <View style={{height: SCREEN_WIDTH * 0.9 * (1/4.7), width: SCREEN_WIDTH * 0.9, backgroundColor: 'rgba(255, 255, 255, 0.5)', paddingHorizontal: 5, borderRadius: 10}}>
      <ScrollView style={{opacity: 1}} horizontal={true} showsHorizontalScrollIndicator={false} bounces={false}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {/* Buttons */}
          <ForecastTile date='Today' rating={3} />
          <ForecastTile date='Today' rating={1} />
          <ForecastTile date='Today' rating={2} />
          <ForecastTile date='Today' rating={10} />
          <ForecastTile date='Today' rating={6} />
          <ForecastTile date='Today' rating={5} />
          <ForecastTile date='Today' rating={3} />
          <ForecastTile date='Today' rating={4} />
        </View>
      </ScrollView>
    </View>
  )
}

type ForecastTileProps = {
  date: string;
  rating: PuntingScore;
};

export function ForecastTile({ date, rating }: ForecastTileProps) {
  return (
    <View style={{ width: SCREEN_WIDTH * 0.9 * (1/4.7), height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>{date}</Text>
      <Text style={{fontSize: 30, color: puntingScoreColors[rating]}}>{rating}/10</Text>
    </View>
  );
}
