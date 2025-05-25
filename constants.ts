import { PuntingScore } from './types/punting';

export const backgroundImages = {
  sunny: {
    imageImport: require('./assets/backgrounds/sunny_background.png'),
    backgroundColor: '#4ac3ad',
  },
  cloudy: {
    imageImport: require('./assets/backgrounds/cloudy background.png'),
    backgroundColor: '#8db5bb',
  },
  rainy: {
    imageImport: require('./assets/backgrounds/rainy background.png'),
    backgroundColor: '#52869d',
  },
  cold: {
    imageImport: require('./assets/backgrounds/cold background.png'),
    backgroundColor: '#a2dde9',
  },
  no_punt: {
    imageImport: require('./assets/backgrounds/no punting background.png'),
    backgroundColor: '#86a4b1',
  },
  night: {
    imageImport: require('./assets/backgrounds/night background.png'),
    backgroundColor: '#25215c',
  },
};

export const backgroundConditionImages = {
  stars: require('./assets/weather/moon + stars.png'),
  rain: require('./assets/weather/rain.png'),
  sun: require('./assets/weather/sun.png'),
  wind: require('./assets/weather/wind.png'),
  clouds: require('./assets/weather/clouds.png'),
};

export const blobBodyImages = {
  punting: require('./assets/blobs/punting blob.png'),
  no_punt: require('./assets/blobs/no punting blob.png'),
  night: require('./assets/blobs/sleeping blob.png'),
};

export const blobFaceImages = {
  cold: require('./assets/face/cold.png'),
  happy: require('./assets/face/happy (sunny).png'),
  neutral: require('./assets/face/neutral-ish (cloudy or windy).png'),
  sad: require('./assets/face/no punt sad.png'),
  very_sad: require('./assets/face/SAD (light rain + clouds (+ wind)).png'),
  sleeping: require('./assets/face/sleeping.png'),
};

export const puntingScoreColors: Record<PuntingScore, string> = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff9900',
  3: '#ff9900',
  4: '#ffff00',
  5: '#ffff00',
  6: '#99ff00',
  7: '#99ff00',
  8: '#00ff00',
  9: '#00ff00',
  10: '#00ff00',
};

export const puntingScoreEmojis: Record<PuntingScore, any> = {
  0: require('./assets/puntingEmoji/NOO.png'),
  1: require('./assets/puntingEmoji/NOO.png'),
  2: require('./assets/puntingEmoji/uhh.png'),
  3: require('./assets/puntingEmoji/uhh.png'),
  4: require('./assets/puntingEmoji/okay.png'),
  5: require('./assets/puntingEmoji/okay.png'),
  6: require('./assets/puntingEmoji/sure.png'),
  7: require('./assets/puntingEmoji/sure.png'),
  8: require('./assets/puntingEmoji/good.png'),
  9: require('./assets/puntingEmoji/good.png'),
  10: require('./assets/puntingEmoji/good.png'),
};
