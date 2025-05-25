// This file is the settings page of our app

import { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

import RadioList from '@/components/RadioList';
import { backgroundImages } from '@/constants';
import { getUserPrefs, updateUserPrefs, UserPrefs } from '@/lib/preferences';

import { BackgroundType } from '@/types/background';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Settings() {
  const { background } = useLocalSearchParams<{
    background?: BackgroundType;
  }>();

  const [preferences, onPreferenceChange] = useState<UserPrefs>({
    presenceOfSun: 3,
    calmWinds: 3,
    comfortableTemperatures: 3,
    absenceOfRain: 3,
    notifications: 'never',
    idealTemperature: 23,
  });
  const preferenceOptions: (keyof UserPrefs)[] = [
    'presenceOfSun',
    'calmWinds',
    'comfortableTemperatures',
    'absenceOfRain',
  ];

  // load saved prefs, don't show page until have at least tried to load them
  let [prefsLoaded, setPrefsLoaded] = useState(false);
  useEffect(() => {
    if (!prefsLoaded) {
      getUserPrefs()
        .then((prefs) => {
          if (prefs !== null) onPreferenceChange(prefs);
          setPrefsLoaded(true);
        })
        .catch((error) => {
          console.error('Error fetching user prefs:', error);
        });
    }
  }, []);

  useEffect(() => {
    updateUserPrefs(preferences).catch((e) =>
      console.log('Error updating user prefs: ', e)
    );
  }, [preferences]);

  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={backgroundImages[background || 'sunny'].imageImport}
          style={styles.backgroundImage}
        />
        <View
          style={{
            ...styles.backgroundColorFill,
            backgroundColor:
              backgroundImages[background || 'sunny'].backgroundColor,
          }}
        />
      </View>

      {/* Spacer for camera bump */}
      <View style={{ height: SCREEN_HEIGHT * 0.065 }}></View>

      {/* Container for settings button and spacer for middle info */}
      <View style={{ left: 0, marginBottom: 20, width: '100%' }}>
        <Button
          mode="contained"
          icon="arrow-left"
          buttonColor={backgroundImages[background || 'sunny'].backgroundColor}
          onPress={() => router.navigate('/')}
          style={{ marginLeft: 15, marginRight: 'auto' }}
        >
          Home
        </Button>
        <Text
          style={{
            fontSize: 48,
            marginBottom: -10,
            marginTop: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Settings
        </Text>
      </View>

      {prefsLoaded ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 0,
            backgroundColor: 'transparent',
            display: 'flex',
          }}
        >
          <View
            style={{
              ...styles.blurContainer,
              backgroundColor:
                backgroundImages[background || 'sunny'].backgroundColor + 'C0',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                paddingBottom: 10,
                fontWeight: 'bold',
              }}
            >
              When do you want notifications?
            </Text>
            <RadioList
              data={[
                { text: 'Weekly', id: 'weekly' },
                { text: 'Only when puntability at least 8', id: 'good' },
                { text: 'Never', id: 'never' },
              ]}
              onSelect={(id) =>
                onPreferenceChange({ ...preferences, notifications: id })
              }
              selectedId={preferences.notifications}
              horizontal={false}
            />
          </View>
          <View
            style={{
              ...styles.blurContainer,
              backgroundColor:
                backgroundImages[background || 'sunny'].backgroundColor + 'C0',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Rate how important these factors are to you:
            </Text>
            {preferenceOptions.map((preferenceOption) => (
              <View key={preferenceOption}>
                <Text style={{ fontSize: 16, color: 'black', paddingTop: 15 }}>
                  {(
                    preferenceOption.charAt(0).toUpperCase() +
                    preferenceOption.slice(1)
                  )
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/Of/, 'of')
                    .slice(1)}
                </Text>
                <RadioList
                  key={preferenceOption}
                  data={[
                    { text: '1', id: 1 },
                    { text: '2', id: 2 },
                    { text: '3', id: 3 },
                    { text: '4', id: 4 },
                    { text: '5', id: 5 },
                  ]}
                  onSelect={(id) =>
                    onPreferenceChange({
                      ...preferences,
                      [preferenceOption]: id,
                    })
                  }
                  selectedId={preferences[preferenceOption]}
                  horizontal={true}
                />
              </View>
            ))}
            <Text
              style={{
                fontSize: 18,
                paddingTop: 15,
                fontWeight: 'bold',
              }}
            >
              Set your ideal temperature (°C):
            </Text>
            <RadioList
              data={[
                { text: '16', id: 16 },
                { text: '18', id: 18 },
                { text: '20', id: 20 },
                { text: '22', id: 22 },
                { text: '24', id: 24 },
                { text: '26', id: 26 },
                { text: '28', id: 28 },
                { text: '30', id: 30 },
              ]}
              onSelect={(id) =>
                onPreferenceChange({ ...preferences, idealTemperature: id })
              }
              selectedId={preferences.idealTemperature}
              horizontal={true}
            />
          </View>
        </View>
      ) : (
        <ActivityIndicator size="large" animating={true} />
      )}
      <View style={{ height: 35 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: -1,
  },
  backgroundImage: {
    width: '100%',
    aspectRatio: 395 / 882,
  },
  backgroundColorFill: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.76,
    backgroundColor: backgroundImages.sunny.backgroundColor,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingTop: 0,
  },
  blurContainer: {
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
    width: SCREEN_WIDTH * 0.9,
    fontSize: 100,
    fontWeight: 'bold',
  },
});
