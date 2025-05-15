// This file is the main page of our app

import { useEffect, useState } from "react";
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";

import { backgrounds } from "@/constants";
import { fetchWeather } from "@/lib/api";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function Index() {
  let [weatherData, setWeatherData] = useState(null);
  
  useEffect(() => {
    if (weatherData === null) {
      fetchWeather()
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  });
  
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollView}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >

      {/* Background image and fill */}
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={backgrounds.sunny.imageImport}
          style={styles.backgroundImage}
        />
        <View style={styles.backgroundColorFill} />
      </View>

      {/* Blobby */}
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require('@/assets/blobs/punting blob.png')}
          style={styles.backgroundImage}
        />
      </View>

      {/* Spacer for camera bump */}
      <View style={{ height: SCREEN_HEIGHT * 0.065}}></View>

      {/* Container for settings button and spacer for middle info */}
      <View style={{ height: SCREEN_HEIGHT * 0.1 }}> </View>

      {/* Container for middle info */}
      <View style={{ height: SCREEN_HEIGHT * 0.25, alignItems: "center", justifyContent: 'flex-start', paddingTop: 0, backgroundColor: 'transparent' }}>
        <Text style={{ fontSize: 24, color: 'black' }}>11th May | Best time 1:48 pm</Text>
        <Text style={{ fontSize: 24, color: 'black' }}>Hello World</Text>
        <Text style={{ fontSize: 24, color: 'black' }}>Hello World</Text>
        <Text style={{ fontSize: 24, color: 'black' }}>Hello World</Text>
        <Text style={{ fontSize: 24, color: 'black' }}>Hello World</Text>
      </View>

      {/* Spacer for bloby */}
      <View style={{ height: SCREEN_HEIGHT * 0.43}}></View>

      {/* Container for forecast bar */}
      <View style={{ height: SCREEN_HEIGHT * 0.1, width: '90%', backgroundColor: 'blue' }}>
        <Text style={{ fontSize: 24, color: 'white' }}>Bottom bar</Text>
      </View>

    </ ScrollView>
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
    backgroundColor: backgrounds.sunny.backgroundColor,
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