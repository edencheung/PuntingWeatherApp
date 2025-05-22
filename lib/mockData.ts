import { HourlyWeatherData, PuntingScore } from '@/types/punting';

// Helper function to generate random weather data
function generateRandomWeatherData(
  day: number,
  hour: number,
  seasonalBias: number = 0
): HourlyWeatherData {
  // Determine if it's day or night (7am-7pm is considered day)
  const isDay = hour >= 7 && hour <= 19;

  // Base seasonal temperatures (assuming spring/summer in UK)
  const baseTemp = 15 + seasonalBias;

  // Day/night temperature variation (cooler at night, warmest mid-afternoon)
  let tempVariation = 0;
  if (isDay) {
    // Peak temperature around 2-3pm
    tempVariation = 5 * Math.sin(((hour - 7) / 12) * Math.PI);
  } else {
    // Cooler at night, coldest around 3-4am
    tempVariation = -3;
  }

  // Add some randomness to temperature
  const randomTempVariation = Math.random() * 4 - 2;

  // Weather patterns - more rain/clouds certain days, clearer on others
  const dayPattern = day % 7;
  let rainChance = 0;
  let windSpeed = 0;

  switch (dayPattern) {
    case 0: // Sunny day
      rainChance = Math.random() * 0.1;
      windSpeed = 5 + Math.random() * 8;
      break;
    case 1: // Partly cloudy
      rainChance = Math.random() * 0.2;
      windSpeed = 8 + Math.random() * 10;
      break;
    case 2: // Mostly cloudy
      rainChance = Math.random() * 0.3;
      windSpeed = 10 + Math.random() * 10;
      break;
    case 3: // Light rain day
      rainChance = 0.4 + Math.random() * 0.3;
      windSpeed = 12 + Math.random() * 15;
      break;
    case 4: // Heavy rain day
      rainChance = 0.6 + Math.random() * 0.4;
      windSpeed = 15 + Math.random() * 20;
      break;
    case 5: // Clearing up
      rainChance = 0.3 + Math.random() * 0.2;
      windSpeed = 10 + Math.random() * 12;
      break;
    case 6: // Nice day
      rainChance = Math.random() * 0.15;
      windSpeed = 5 + Math.random() * 7;
      break;
  }

  // Time of day affects rain/wind
  if (!isDay) {
    rainChance *= 0.7; // Less rain at night typically
    windSpeed *= 0.8; // Often less wind at night
  }

  // Calculate temperature with all factors
  const temperature =
    Math.round((baseTemp + tempVariation + randomTempVariation) * 10) / 10;

  // Make sure rain isn't negative
  const rainPercent = Math.max(0, Math.min(1, rainChance));

  // Calculate punting score based on conditions
  // Better scores during day, with good temperature, low rain, and low wind
  let puntingScore = 0;

  if (isDay) {
    // Base score for daytime
    let score = 5;

    // Temperature factor (ideal around 18-22°C)
    const tempFactor = 3 - Math.abs(temperature - 20) / 3;

    // Rain penalty
    const rainPenalty = rainPercent * 6;

    // Wind penalty (higher winds reduce score more)
    const windPenalty = windSpeed > 15 ? 3 : windSpeed / 5;

    // Calculate final score
    score = score + tempFactor - rainPenalty - windPenalty;

    // Clamp to valid range and round to nearest integer
    puntingScore = Math.max(0, Math.min(10, Math.round(score))) as PuntingScore;
  }

  return {
    puntingScore: puntingScore as PuntingScore,
    temperature: temperature,
    rainPercent: rainPercent,
    wind: windSpeed,
  };
}

// Create mock data for next 7 days
export const mockData: Record<number, Record<number, HourlyWeatherData>> = {};

// Generate data for 7 days (0 to 6)
for (let day = 0; day <= 6; day++) {
  mockData[day] = {};

  // Seasonal bias - slightly warmer as we move forward
  const seasonalBias = day * 0.2;

  // Generate data for each hour (0 to 23)
  for (let hour = 0; hour <= 23; hour++) {
    mockData[day][hour] = generateRandomWeatherData(day, hour, seasonalBias);
  }
}
