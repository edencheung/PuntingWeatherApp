import { fetch } from 'expo/fetch';

// TODO: make this a interface


const fetchWeather = async () => {
    const params = new URLSearchParams({
        key: process.env.EXPO_PUBLIC_API_KEY || "",
        q: "CB2",
        days: "7",

    });
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?${params}`);
    const json = await res.json();
    return json;
};

export { fetchWeather };

