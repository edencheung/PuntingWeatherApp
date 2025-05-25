// This file is the main page of our app

import { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { CentralDisplay } from '@/components/CentralDisplay';
import { ForecastBar } from '@/components/ForecastBar';
import { HourlyView } from '@/components/HourlyView';
import { WeatherGraph } from '@/components/WeatherGraph';
import {
  backgroundConditionImages,
  backgroundImages,
  blobBodyImages,
  blobFaceImages,
} from '@/constants';
import { fetchWeather } from '@/lib/api';
import {
  getBackgroundDataForDate,
  getCurrentBackgroundData,
} from '@/lib/conditions';
import { getUserPrefs, UserPrefs } from '@/lib/preferences';
import {
  getAllHourlyWeatherData,
  getBestPuntingScoreData,
  getDailyWeatherData,
  getFilteredHourlyWeatherData,
} from '@/lib/weatherDetails';
import {
  BackgroundCondition,
  BackgroundData,
  BackgroundType,
  BlobFace,
  BlobState,
} from '@/types/background';
import { PuntingScore } from '@/types/punting';
import { WeatherResponse } from '@/types/weather';
import { useRouter } from 'expo-router';
import { IconButton } from 'react-native-paper';

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
  useEffect(() => {
    if (weatherData === undefined) {
      fetchWeather()
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [weatherData]);

  const [userPrefs, setUserPrefs] = useState<UserPrefs | null>(null);
  useEffect(() => {
    getUserPrefs().then(setUserPrefs);
  }, []);

  const router = useRouter();

  const { hour, data } = getBestPuntingScoreData(
    dateDelta,
    weatherData,
    userPrefs
  );

  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() + dateDelta);

  const [backgroundData, setBackgroundData] = useState<BackgroundData>();

  useEffect(() => {
    if (!weatherData || userPrefs == null || dateDelta == null) return;

    let data: BackgroundData;
    if (dateDelta === 0) {
      data = getCurrentBackgroundData(weatherData, userPrefs);
    } else {
      data = getBackgroundDataForDate(weatherData, dateDelta, userPrefs);
    }

    setBackgroundData(data);
    setBackground(data.backgroundType as BackgroundType);
    setBackgroundConditions(data.backgroundConditions);
    setBlobState(data.blobState as BlobState);
    setBlobFace(data.blobFace as BlobFace);
  }, [weatherData, userPrefs, dateDelta]);

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
      <View
        style={{
          height: SCREEN_HEIGHT * 0.1,
          display: 'flex',
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        <IconButton
          accessibilityLabel="Settings"
          icon="cog"
          iconColor="grey"
          size={40}
          style={{ marginLeft: 'auto', marginRight: 25 }}
          onPress={() => router.navigate(`/settings?background=${background}`)}
        />
      </View>
      {/* Container for middle info */}
      <CentralDisplay
        date={dateObj.toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })}
        bestTime={`${hour}:00`}
        puntingScore={data.puntingScore as PuntingScore}
        dailySummary="TODO"
        weatherConditionsSummary="TODO"
      />
      {/* Spacer for bloby */}
      <View style={{ height: SCREEN_HEIGHT * 0.47 }}></View>
      {/* Container for forecast bar */}
      <ForecastBar
        dateDelta={dateDelta}
        setDateDelta={setDateDelta}
        dailyWeatherData={getDailyWeatherData(weatherData, userPrefs)}
      />
      {/* Punting Scores */}
      {/* Using filtered data to show only current hour onwards for today */}
      <HourlyView
        hourlyWeatherData={getFilteredHourlyWeatherData(
          weatherData,
          dateDelta,
          userPrefs
        )}
      />
      {/* Weather Graph */}
      {/* Using filtered data to show only current hour onwards for today */}
      <WeatherGraph
        hourlyWeatherData={getAllHourlyWeatherData(
          weatherData,
          dateDelta,
          userPrefs
        )}
      />
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
    height: SCREEN_HEIGHT * 0.8,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: SCREEN_HEIGHT * 1.8,
    paddingTop: 0,
  },
});
