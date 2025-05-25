import {
  BackgroundCondition,
  BackgroundData,
  BackgroundType,
  BlobFace,
  BlobState,
} from '@/types/background';
import { WeatherSummary } from '@/types/punting';
import { WeatherResponse } from '@/types/weather';
import { UserPrefs } from './preferences';
import {
  getBestPuntingScoreData,
  getCurrentPuntingScore,
} from './weatherDetails';

const noPuntingScore = 3;
const windIndicator = 15;
const coldIndicator = 8;

function isNight(weatherData: WeatherResponse) {
  // check for night

  if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) {
    return false; // Default to day if no data is available
  }

  const today = new Date().toISOString().split("T")[0];

  const now = new Date();

  const sunriseDateTimeString = `${today} ${weatherData.forecast.forecastday[0].astro.sunrise}`;
  const sunriseDate = new Date(sunriseDateTimeString);

  const sunsetDateTimeString = `${today} ${weatherData.forecast.forecastday[0].astro.sunset}`;
  const sunsetDate = new Date(sunsetDateTimeString);

  return now < sunriseDate || now > sunsetDate;
}

function getCurrentBackgroundType(
  weatherData: WeatherResponse,
  userPrefs: UserPrefs
): BackgroundType {
  // check for no punting
  if (getCurrentPuntingScore(weatherData, userPrefs) <= noPuntingScore) {
    return 'no_punt';
  }

  // check for current rain
  if (weatherData.current.precip_mm > 0) {
    return 'rainy';
  }

  // check for cloud
  if (weatherData.current.condition.text === 'Cloudy') {
    return 'cloudy';
  }

  if (weatherData.current.temp_c <= coldIndicator) {
    return 'cold';
  }

  return 'sunny';
}

function getCurrentBackgroundConditions(
  weatherData: WeatherResponse
): BackgroundCondition[] {
  let backgroundConditions: BackgroundCondition[] = [];

  if (weatherData.current.condition.text === 'Cloudy') {
    backgroundConditions.push('clouds');
  } else if (weatherData.current.condition.text === 'Rainy') {
    backgroundConditions.push('rain');
    backgroundConditions.push('clouds');
  }

  if (isNight(weatherData)) {
    backgroundConditions.push('stars');
  }

  if (backgroundConditions.length === 0) {
    backgroundConditions.push('sun');
  }

  if (weatherData.current.wind_mph > windIndicator) {
    backgroundConditions.push('wind');
  }

  return backgroundConditions;
}

function getCurrentBlobState(
  weatherData: WeatherResponse,
  userPrefs: UserPrefs
): BlobState {
  if (isNight(weatherData)) {
    return 'night';
  }

  if (getCurrentPuntingScore(weatherData, userPrefs) <= noPuntingScore) {
    return 'no_punt';
  }

  return 'punting';
}

function getCurrentBlobFace(
  weatherData: WeatherResponse,
  userPrefs: UserPrefs
): BlobFace {
  if (getCurrentPuntingScore(weatherData, userPrefs) <= noPuntingScore) {
    return 'very_sad';
  }

  if (isNight(weatherData)) {
    return 'sleeping';
  }

  if (weatherData.current.precip_mm > 0) {
    return 'sad';
  }

  if (weatherData.current.temp_c <= coldIndicator) {
    return 'cold';
  }

  if (weatherData.current.condition.text === 'Cloudy') {
    return 'neutral';
  }

  return 'happy';
}

export function getCurrentBackgroundData(
  weatherData: WeatherResponse | undefined,
  userPrefs: UserPrefs | null
): BackgroundData {
  if (!weatherData || !userPrefs) {
    return {
      backgroundType: 'sunny',
      backgroundConditions: [],
      blobState: 'punting',
      blobFace: 'happy',
    };
  }

  return {
    backgroundType: getCurrentBackgroundType(weatherData, userPrefs),
    backgroundConditions: getCurrentBackgroundConditions(weatherData),
    blobState: getCurrentBlobState(weatherData, userPrefs),
    blobFace: getCurrentBlobFace(weatherData, userPrefs),
  };
}

function getBackgroundTypeForDate(
  weatherData: WeatherResponse,
  date: number,
  userPrefs: UserPrefs
): BackgroundType {
  let { hour, data } = getBestPuntingScoreData(date, weatherData, userPrefs);

  // check for no punting
  if (data.puntingScore <= noPuntingScore) {
    return 'no_punt';
  }

  // check for current rain
  if (weatherData.forecast.forecastday[date].hour[hour].will_it_rain === 1) {
    return 'rainy';
  }

  // check for cloud
  if (
    weatherData.forecast.forecastday[date].hour[hour].condition.text ===
    'Cloudy'
  ) {
    return 'cloudy';
  }

  if (
    weatherData.forecast.forecastday[date].hour[hour].temp_c <= coldIndicator
  ) {
    return 'cold';
  }

  return 'sunny';
}

function getBackgroundConditionsForDate(
  weatherData: WeatherResponse,
  date: number,
  userPrefs: UserPrefs
): BackgroundCondition[] {
  let { hour, data } = getBestPuntingScoreData(date, weatherData, userPrefs);

  let backgroundConditions: BackgroundCondition[] = [];

  if (
    weatherData.forecast.forecastday[date].hour[hour].condition.text ===
    'Cloudy'
  ) {
    backgroundConditions.push('clouds');
  } else if (
    weatherData.forecast.forecastday[date].hour[hour].condition.text === 'Rainy'
  ) {
    backgroundConditions.push('rain');
    backgroundConditions.push('clouds');
  }

  if (backgroundConditions.length === 0) {
    backgroundConditions.push('sun');
  }

  if (
    weatherData.forecast.forecastday[date].hour[hour].wind_mph > windIndicator
  ) {
    backgroundConditions.push('wind');
  }

  return backgroundConditions;
}

function getBlobStateForDate(
  weatherData: WeatherResponse,
  date: number,
  userPrefs: UserPrefs
): BlobState {
  let { hour, data } = getBestPuntingScoreData(date, weatherData, userPrefs);

  if (data.puntingScore <= noPuntingScore) {
    return 'no_punt';
  }

  return 'punting';
}

function getBlobFaceForDate(
  weatherData: WeatherResponse,
  date: number,
  userPrefs: UserPrefs
): BlobFace {
  let { hour, data } = getBestPuntingScoreData(date, weatherData, userPrefs);

  if (data.puntingScore <= noPuntingScore) {
    return 'very_sad';
  }

  if (weatherData.forecast.forecastday[date].hour[hour].precip_mm > 0) {
    return 'sad';
  }

  if (weatherData.forecast.forecastday[date].hour[hour].temp_c <= coldIndicator) {
    return 'cold';
  }

  if (weatherData.forecast.forecastday[date].hour[hour].condition.text === 'Cloudy') {
    return 'neutral';
  }

  return 'happy';
}

export function getBackgroundDataForDate(
  weatherData: WeatherResponse | undefined,
  date: number,
  userPrefs: UserPrefs | null
): BackgroundData {
  if (!weatherData || !userPrefs) {
    return {
      backgroundType: 'sunny',
      backgroundConditions: [],
      blobState: 'punting',
      blobFace: 'happy',
    };
  }

  return {
    backgroundType: getBackgroundTypeForDate(weatherData, date, userPrefs),
    backgroundConditions: getBackgroundConditionsForDate(weatherData, date, userPrefs),
    blobState: getBlobStateForDate(weatherData, date, userPrefs),
    blobFace: getBlobFaceForDate(weatherData, date, userPrefs),
  };
}

export function getOverallSummary(
  date: number,
  weatherData: WeatherResponse,
  userPrefs: UserPrefs
): WeatherSummary {
  return {
    bestTime: "best hour: " + getBestPuntingScoreData(date, weatherData, userPrefs).hour,
    description: "TODO desc",
    temperatureRange: "TODO temp",
    windDescription: "TODO wind",
    weatherDescription: "TODO weather",
  }
}
