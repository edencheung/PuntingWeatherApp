import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('@/assets/fonts/Quicksand-Bold.ttf'),
    'CherryBomb-Regular': require('@/assets/fonts/cherrybombone-regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or a loading screen if you want
  }

  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
