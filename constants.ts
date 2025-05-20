// Background images
import cloudyBackground from './assets/backgrounds/cloudy background.png';
import coldBackground from './assets/backgrounds/cold background.png';
import nightBackground from './assets/backgrounds/night background.png';
import noPuntBackground from './assets/backgrounds/no punting background.png';
import rainyBackground from './assets/backgrounds/rainy background.png';
import sunnyBackground from './assets/backgrounds/sunny_background.png';

// Weather conditions
import cloudsImage from './assets/weather/clouds.png';
import starsImage from './assets/weather/moon + stars.png';
import rainImage from './assets/weather/rain.png';
import sunImage from './assets/weather/sun.png';
import windImage from './assets/weather/wind.png';

// Blobs
import noPuntBlob from './assets/blobs/no punting blob.png';
import puntingBlob from './assets/blobs/punting blob.png';
import sleepingBlob from './assets/blobs/sleeping blob.png';

// Blob faces
import coldFace from './assets/face/cold.png';
import happyFace from './assets/face/happy (sunny).png';
import neutralFace from './assets/face/neutral-ish (cloudy or windy).png';
import sadFace from './assets/face/no punt sad.png';
import verySadFace from './assets/face/SAD (light rain + clouds (+ wind)).png';
import sleepingFace from './assets/face/sleeping.png';

import { PuntingScore } from './types/punting';

export const backgroundImages = {
  sunny: {
    imageImport: sunnyBackground,
    backgroundColor: '#4ac3ad',
  },
  cloudy: {
    imageImport: cloudyBackground,
    backgroundColor: '#8db5bb',
  },
  rainy: {
    imageImport: rainyBackground,
    backgroundColor: '#52869d',
  },
  cold: {
    imageImport: coldBackground,
    backgroundColor: '#a2dde9',
  },
  no_punt: {
    imageImport: noPuntBackground,
    backgroundColor: '#86a4b1',
  },
  night: {
    imageImport: nightBackground,
    backgroundColor: '#25215c',
  }
}

export const backgroundConditionImages = {
  stars: starsImage,
  rain: rainImage,
  sun: sunImage,
  wind: windImage,
  clouds: cloudsImage,
}

export const blobBodyImages = {
  punting: puntingBlob,
  no_punt: noPuntBlob,
  night: sleepingBlob,
}

export const blobFaceImages = {
  cold: coldFace,
  happy: happyFace,
  neutral: neutralFace,
  sad: sadFace,
  very_sad: verySadFace,
  sleeping: sleepingFace,
}

export const puntingScoreColors: Record<PuntingScore, string> = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff0000',
  3: '#ff9900',
  4: '#ff9900',
  5: '#ffff00',
  6: '#99ff00',
  7: '#99ff00',
  8: '#00ff00',
  9: '#00ff00',
  10: '#00ff00'
}