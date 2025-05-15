import { Button, Dimensions, ScrollView, StyleSheet, View } from "react-native";

import { fetchWeather } from "@/lib/api";


const { height: SCREEN_HEIGHT } = Dimensions.get('window');

async function fetchHello() {
    const weather = fetchWeather();
    console.log(process.env.EXPO_PUBLIC_API_KEY);
    console.log(weather);
  }

export default function Index() {

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollView}
      bounces={false}
    >
    <View style={{ flex: 0.8, alignItems: "center", justifyContent: 'flex-start', paddingTop: 0, backgroundColor: 'transparent' }}>
      <Button onPress={() => fetchHello()} title="Fetch hello" />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: SCREEN_HEIGHT * 1.8,
    zIndex: -1,
  },
  backgroundImage: {
    width: '100%',
    aspectRatio: 395/882
  },
  backgroundColorFill: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.8,
    backgroundColor: 'skyblue',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: 'flex-start',
    width: '100%',
    height: SCREEN_HEIGHT * 1.8,
    paddingTop: 0,
  },
});