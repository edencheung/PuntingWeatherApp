import { WeatherResponse } from '@/types/weather';
import { fetch } from 'expo/fetch';

export async function fetchWeather(): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    key: process.env.EXPO_PUBLIC_API_KEY || '',
    q: 'CB2',
    days: '8',
  });
  const res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?${params}`
  );
  const json = await res.json();
  return json as WeatherResponse;
}
