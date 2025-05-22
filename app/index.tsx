// This file is the main page of our app

import { useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { CentralDisplay } from '@/components/CentralDisplay';
import { ForecastBar } from '@/components/ForecastBar';
import {
  backgroundConditionImages,
  backgroundImages,
  blobBodyImages,
  blobFaceImages,
} from '@/constants';
import { fetchWeather } from '@/lib/api';
import { getHourlyWeatherData } from '@/lib/weatherDetails';
import {
  BackgroundCondition,
  BackgroundType,
  BlobFace,
  BlobState,
} from '@/types/background';
import { HourlyWeatherData } from '@/types/punting';
import { WeatherResponse } from '@/types/weather';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Index() {
  let [background, setBackground] = useState<BackgroundType>('sunny');
  let [backgroundConditions, setBackgroundConditions] = useState<
    BackgroundCondition[]
  >([]);
  let [blobState, setBlobState] = useState<BlobState>('punting');
  let [blobFace, setBlobFace] = useState<BlobFace>('happy');

  // 0 for now, then number of dates in the future.
  let [dateDelta, setDateDelta] = useState<number>(0);
  let [weatherData, setWeatherData] = useState<WeatherResponse>();
  let [hourlyGraphData, setHourlyGraphData] =
    useState<Record<number, HourlyWeatherData>>();

  useEffect(() => {
    if (weatherData === null) {
      fetchWeather()
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (!weatherData) return;
    setHourlyGraphData(getHourlyWeatherData(weatherData, dateDelta));
  }, [dateDelta, weatherData]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollView}
      bounces={false}
      showsVerticalScrollIndicator={false}
      pagingEnabled={true}
    >
      {/* Background image and fill */}
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={backgroundImages[background].imageImport}
          style={styles.backgroundImage}
        />
        <View
          style={{
            ...styles.backgroundColorFill,
            backgroundColor: backgroundImages[background].backgroundColor,
          }}
        />
      </View>

      {/* Background conditions */}
      {backgroundConditions.map((condition, index) => (
        <View style={styles.backgroundContainer} key={index}>
          <ImageBackground
            source={backgroundConditionImages[condition]}
            style={styles.backgroundImage}
          />
        </View>
      ))}

      {/* Blobby */}
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={blobBodyImages[blobState]}
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={blobFaceImages[blobFace]}
          style={styles.backgroundImage}
        />
      </View>

      {/* Spacer for camera bump */}
      <View style={{ height: SCREEN_HEIGHT * 0.065 }}></View>

      {/* Container for settings button and spacer for middle info */}
      <View style={{ height: SCREEN_HEIGHT * 0.1 }}>
        <Button
          title="Settings"
          onPress={() => router.navigate(`/settings?background=${background}`)}
        />
      </View>

      {/* Container for middle info */}
      <CentralDisplay />

      {/* Spacer for bloby */}
      <View style={{ height: SCREEN_HEIGHT * 0.43 }}></View>

      {/* Container for forecast bar */}
      <ForecastBar />
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
    aspectRatio: 395 / 882,
  },
  backgroundColorFill: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.76,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: SCREEN_HEIGHT * 1.76,
    paddingTop: 0,
  },
});
