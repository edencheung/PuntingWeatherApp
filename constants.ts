interface BackgroundImage {
  imageImport: any;
  backgroundColor: string;
}

export const backgrounds: Record<string, BackgroundImage> = {
  sunny: {
    imageImport: require('@/assets/backgrounds/sunny background.png'),
    backgroundColor: '#4ac3ad',
  },
  cloudy: {
    imageImport: require('@/assets/backgrounds/cloudy background.png'),
    backgroundColor: '#8db5bb',
  },
  rainy: {
    imageImport: require('@/assets/backgrounds/rainy background.png'),
    backgroundColor: '#52869d',
  },
  cold: {
    imageImport: require('@/assets/backgrounds/cold background.png'),
    backgroundColor: '#a2dde9',
  },
  no_punt: {
    imageImport: require('@/assets/backgrounds/no punting background.png'),
    backgroundColor: '#86a4b1',
  },
  night: {
    imageImport: require('@/assets/backgrounds/night background.png'),
    backgroundColor: '#25215c',
  }
}