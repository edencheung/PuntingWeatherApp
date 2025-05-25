import { UserPrefs } from '@/lib/preferences';
import { HourlyWeatherData, PuntingScore } from '@/types/punting';
import { WeatherResponse } from '@/types/weather';

function calcPuntingScore(
  temp: number,
  precip: number,
  wind: number,
  cloud: number,
  isDay: boolean = true,
  prefs: UserPrefs
): PuntingScore {
  if (!isDay) return 0 as PuntingScore;
  const {
    presenceOfSun,
    calmWinds,
    comfortableTemperatures,
    absenceOfRain,
    notifications,
    idealTemperature,
  } = prefs;
  const tempScore = Math.exp(-0.03 * Math.pow(temp - idealTemperature, 2));
  const precipScore = Math.exp(-2 * precip);
  const windScore = Math.exp(-0.0015 * Math.pow(wind, 2));
  const cloudScore = Math.exp(-0.0004 * Math.pow(cloud, 2));

  const penalty = 0.02 * precip * wind;

  const weightedSum =
    comfortableTemperatures + absenceOfRain + calmWinds + presenceOfSun;
  const inverseWeightedScore =
    comfortableTemperatures / tempScore +
    absenceOfRain / precipScore +
    calmWinds / windScore +
    presenceOfSun / cloudScore;

  const rawScore = 10 * (weightedSum / inverseWeightedScore - penalty);

  // Clamp score to [0, 10], round to nearest integer
  const finalScore = Math.round(
    Math.max(0, Math.min(10, rawScore))
  ) as PuntingScore;

  return finalScore;
}

export function getCurrentPuntingScore(
  weatherData: WeatherResponse,
  prefs: UserPrefs
): PuntingScore {
  const temp = weatherData.current.temp_c; // °C
  const precip = weatherData.current.precip_mm; // mm
  const wind = weatherData.current.wind_kph; // km/h or m/s (confirm units!)
  const cloud = weatherData.current.cloud; // percentage (0–100)
  const isDay = weatherData.current.is_day === 1;

  return calcPuntingScore(temp, precip, wind, cloud, isDay, prefs);
}

// Gets per hour weather data for a specific date
export function getHourlyWeatherData(
  weatherData: WeatherResponse,
  date: number,
  hour: number,
  prefs: UserPrefs
): HourlyWeatherData {
  const targetDay = weatherData.forecast.forecastday[date];

  if (!targetDay || !targetDay.hour || hour < 0 || hour >= 24) {
    return {
      puntingScore: 0,
      temperature: 0,
      rainPercent: 0,
      wind: 0,
    };
  }

  const targetEntry = targetDay.hour[hour];

  if (!targetEntry) {
    return {
      puntingScore: 0,
      temperature: 0,
      rainPercent: 0,
      wind: 0,
    };
  }

  const temperature = targetEntry.temp_c;
  const rainPercent = targetEntry.chance_of_rain / 100;
  const wind = targetEntry.wind_kph;
  const cloud = targetEntry.cloud;
  const precip = targetEntry.precip_mm;
  const isDay = targetEntry.is_day === 1;

  const puntingScore = calcPuntingScore(
    temperature,
    precip,
    wind,
    cloud,
    isDay,
    prefs
  );

  return {
    puntingScore,
    temperature,
    rainPercent,
    wind,
  };
}

export function getAllHourlyWeatherData(
  weather: WeatherResponse | undefined,
  date: number,
  prefs: UserPrefs | null): Record<number, HourlyWeatherData> {
  const hourlyData: Record<number, HourlyWeatherData> = {};

  if (!weather || !weather.forecast || !weather.forecast.forecastday) {
    return hourlyData; // Return empty if no forecast data is available
  }

  if (!prefs) {
    return hourlyData; // Return empty if no user preferences are available
  }

  for (let hour = 0; hour < 24; hour++) {
    hourlyData[hour] = getHourlyWeatherData(weather, date, hour, prefs);
  }

  return hourlyData;
}

// returns the best punting score for a given day (the best hour)
export function getBestPuntingScoreData(
  dateEpoch: number,
  weatherData: WeatherResponse | undefined,
  prefs: UserPrefs | null
) {
  if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) {
    return { hour: 0, data: { puntingScore: 0, temperature: 0, rainPercent: 0, wind: 0 } };
  }

  if (!prefs) {
    return { hour: 0, data: { puntingScore: 0, temperature: 0, rainPercent: 0, wind: 0 } };
  }

  let bestWeatherData: HourlyWeatherData = {
    puntingScore: 0,
    temperature: 0,
    rainPercent: 0,
    wind: 0,
  };

  let bestHour = 0;

  for (let hour = 0; hour < 24; hour++) {
    const data = getHourlyWeatherData(weatherData, dateEpoch, hour, prefs);
    if (data.puntingScore > bestWeatherData.puntingScore) {
      bestWeatherData = data;
      bestHour = hour;
    }
  }

  return { hour: bestHour, data: bestWeatherData };
}

export function getDailyWeatherData(
  weatherData: WeatherResponse | undefined,
  prefs: UserPrefs | null
): Record<number, Record<number, HourlyWeatherData>> | undefined {
  const dailyData: Record<number, Record<number, HourlyWeatherData>> = {};

  if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) {
    return undefined; // Return empty if no forecast data is available
  }

  if (!prefs) {
    return undefined; // Return empty if no user preferences are available
  }

  for (let date = 0; date < weatherData.forecast.forecastday.length; date++) {
    dailyData[date] = getAllHourlyWeatherData(weatherData, date, prefs);
  }

  return dailyData;
}