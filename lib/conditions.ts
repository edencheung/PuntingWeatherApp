import {
  BackgroundCondition,
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

const noPuntingScore = 2;
const windIndicator = 15;
const coldIndicator = 8;

function isNight(weatherData: WeatherResponse) {
  // check for night

  const now = new Date();
  const hours = now.getHours();

  const sunriseHour = parseInt(
    weatherData.forecast.forecastday[0].astro.sunrise.substring(0, 1)
  );
  const sunsetHour = parseInt(
    weatherData.forecast.forecastday[0].astro.sunset.substring(0, 1)
  );

  return hours < sunriseHour || hours > sunsetHour;
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
  weatherData: WeatherResponse,
  userPrefs: UserPrefs
) {
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
  date: number
): BlobState {
  // TODO
}

function getBlobFaceForDate(
  weatherData: WeatherResponse,
  date: number
): BlobFace {
  // TODO
}

export function getBackgroundDataForDate(
  weatherData: WeatherResponse,
  date: number
) {
  return {
    backgroundType: getBackgroundTypeForDate(weatherData, date),
    backgroundConditions: getBackgroundConditionsForDate(weatherData, date),
    blobState: getBlobStateForDate(weatherData, date),
    blobFace: getBlobFaceForDate(weatherData, date),
  };
}

export function getOverallSummary(date: number): WeatherSummary {
  // TODO
}
