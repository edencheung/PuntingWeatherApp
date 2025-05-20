import { BackgroundType } from '@/types/background';
import { PuntingScore, WeatherSummary } from '@/types/punting';
import { ForecastDay, HourForecast } from '@/types/weather';

const noPuntingScore = 2;
const coldIndicator = 8;


// returns a string indicating what background to use based on weather data
// priorities in descending order
// night, no punting, rain, cloud, cold, sunny 
function getBackgroundType (day: ForecastDay, puntingScore: PuntingScore): BackgroundType {
    // check for night

    const now = new Date();
    const hours = now.getHours();

    const sunriseHour = parseInt(day.astro.sunrise.substring(0, 1))
    const sunsetHour = parseInt(day.astro.sunset.substring(0, 1))

    if (hours < sunriseHour || hours > sunsetHour) {
        return "night";
    }

    // check for no punting
    if (puntingScore <= noPuntingScore) {
        return "no_punt";
    }

    // check for rain
    if (day.day.daily_will_it_rain === 1) {
        return "rainy";
    }

    // check for cloud
    if (day.day.condition.text === "Cloudy") {
        return "cloudy";
    }

    if (day.day.avgtemp_c <= coldIndicator) {
        return "cold";
    }

    return "sunny";
};

function getBestHour(hours: HourForecast[]){
    let hourForecast = hours[0];
    let topScore = extractPuntabilityScore(hours[0])

    for (let i = 0; i < hours.length; i++) {
        const score = extractPuntabilityScore(hours[i])
        if (score > topScore) {
            topScore = score;
            hourForecast = hours[i];
        }
    }
}

function getCurrentBackgroundType(): BackgroundType {
    // TODO
}

function getCurrentBackgroundConditions(): BackgroundCondition[] {
    // TODO
}

function getCurrentBlobState(): BlobState {
    // TODO
}

function getCurrentBlobFace(): BlobFace {
    // TODO
}

export function getCurrentBackgroundData() {
  return {
    backgroundType: getCurrentBackgroundType(),
    backgroundConditions: getCurrentBackgroundConditions(),
    blobState: getCurrentBlobState(),
    blobFace: getCurrentBlobFace(),
  }
}

function getBackgroundTypeForDate(date: number): BackgroundType {
    // TODO
}

function getBackgroundConditionsForDate(date: number): BackgroundCondition[] {
    // TODO
}

function getBlobStateForDate(date: number): BlobState {
    // TODO
}

function getBlobFaceForDate(date: number): BlobFace {
    // TODO
}

export function getBackgroundDataForDate(date: number) {
  return {
    backgroundType: getBackgroundTypeForDate(date),
    backgroundConditions: getBackgroundConditionsForDate(date),
    blobState: getBlobStateForDate(date),
    blobFace: getBlobFaceForDate(date),
  }
}

export function getOverallSummary(date: number): WeatherSummary {
  // TODO
}