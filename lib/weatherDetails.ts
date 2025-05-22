import { HourlyWeatherData, PuntingScore } from '@/types/punting';
import { WeatherResponse } from '@/types/weather';

/*export function getCurrentPuntingScore(
  weatherData: WeatherResponse
): PuntingScore {
  // TODO
  let temp_score = Math.E ** (-0.03 * )
  weatherData.current.cloud;
def punting_score(temp: int, precip: float, wind: float, cloud: int, temp_ideal=22, wt=3, wp=5, ww=2, wc=3) -> int:
    temp_score = math.e ** (-0.03 * (temp - temp_ideal) ** 2)
    precip_score = math.e ** (-2 * precip)
    wind_score = math.e ** (-0.0015 * wind ** 2)
    cloud_score = math.e ** (-0.0004 * cloud ** 2)
    penalty = 0.02 * precip * wind
    score = 10 * ((wt + wp + ww + wc) / (wt/temp_score + wp/precip_score + ww/wind_score + wc/cloud_score) - penalty)
    return score


   
}*/

export function getCurrentPuntingScore(
  weatherData: WeatherResponse
): PuntingScore {
  const temp = weatherData.current.temp_c; // °C
  const precip = weatherData.current.precip_mm; // mm
  const wind = weatherData.current.wind_kph; // km/h or m/s (confirm units!)
  const cloud = weatherData.current.cloud; // percentage (0–100)

  const tempIdeal = 22; //should be from user input (current place-in)
  const wt = 3,
    wp = 5,
    ww = 2,
    wc = 3;

  const tempScore = Math.exp(-0.03 * Math.pow(temp - tempIdeal, 2));
  const precipScore = Math.exp(-2 * precip);
  const windScore = Math.exp(-0.0015 * Math.pow(wind, 2));
  const cloudScore = Math.exp(-0.0004 * Math.pow(cloud, 2));

  const penalty = 0.02 * precip * wind;

  const weightedSum = wt + wp + ww + wc;
  const inverseWeightedScore =
    wt / tempScore + wp / precipScore + ww / windScore + wc / cloudScore;

  const rawScore = 10 * (weightedSum / inverseWeightedScore - penalty);

  // Clamp score to [0, 10]
  const finalScore = Math.max(0, Math.min(10, rawScore));

  return finalScore;
}

// Gets per hour weather data for a specific date
export function getHourlyWeatherData(
  weatherData: WeatherResponse,
  date: number
): Record<number, HourlyWeatherData> {
  // TODO
}
