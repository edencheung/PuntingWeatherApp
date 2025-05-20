export type PuntingScore = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;


export type WeatherSummary = {
  bestTime: string;
  description: string;
  temperatureRange: string;
  windDescription: string;
  weatherDescription: string;
}

export type HourlyWeatherData = {
  [hour: number]: {
    puntingScore: PuntingScore;
    temperature: number;
    rainPercent: number;
    wind: number;
  }
}