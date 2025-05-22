// This file is the settings page of our app

import { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import RadioList from '@/components/RadioList';
import { backgroundImages } from '@/constants';
import { getUserPrefs, updateUserPrefs, UserPrefs } from '@/lib/preferences';

import { BackgroundType } from '@/types/background';
import { useLocalSearchParams } from 'expo-router';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
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

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={backgroundImages[background || 'sunny'].imageImport}
          style={styles.backgroundImage}
        />
      </View>

      {/* Spacer for camera bump */}
      <View style={{ height: SCREEN_HEIGHT * 0.065 }}></View>

      {/* Container for settings button and spacer for middle info */}
      <View style={{ height: SCREEN_HEIGHT * 0.1 }}></View>

      {/* Container for middle info */}
      {prefsLoaded ? (
        <View
          style={{
            height: SCREEN_HEIGHT * 0.25,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 0,
            backgroundColor: 'transparent',
          }}
        >
          <View style={styles.blurContainer}>
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
          <View style={styles.blurContainer}>
            <Text>Rate how important these factors are to you:</Text>
            {preferenceOptions.map((preferenceOption) => (
              <View key={preferenceOption}>
                <Text>
                  {(
                    preferenceOption.charAt(0).toUpperCase() +
                    preferenceOption.slice(1)
                  ).replace(/([A-Z])/g, ' $1')}
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
            <Text>Set your ideal temperature:</Text>
            <RadioList
              data={[
                { text: '20', id: 20 },
                { text: '21', id: 21 },
                { text: '22', id: 22 },
                { text: '23', id: 23 },
                { text: '24', id: 24 },
                { text: '25', id: 25 },
                { text: '26', id: 26 },
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
      {prefsLoaded ? (
        <View
          style={{
            height: SCREEN_HEIGHT * 0.25,
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 0,
            backgroundColor: 'transparent',
            display: 'flex',
          }}
        >
          <View style={styles.blurContainer}>
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
          <View style={styles.blurContainer}>
            <Text>Rate how important these factors are to you:</Text>
            {preferenceOptions.map((preferenceOption) => (
              <View key={preferenceOption}>
                <Text>
                  {(
                    preferenceOption.charAt(0).toUpperCase() +
                    preferenceOption.slice(1)
                  ).replace(/([A-Z])/g, ' $1')}
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
            <Text>Set your ideal temperature:</Text>
            {/* <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          /> */}
            <Text>Test</Text>
            <RadioList
              data={[
                { text: '20', id: 20 },
                { text: '21', id: 21 },
                { text: '22', id: 22 },
                { text: '23', id: 23 },
                { text: '24', id: 24 },
                { text: '25', id: 25 },
                { text: '26', id: 26 },
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
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: SCREEN_HEIGHT * 1.8,
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
    height: SCREEN_HEIGHT * 1.76,
    paddingTop: 0,
  },
  blurContainer: {
    backgroundColor: 'lightgrey',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    backdropFilter: 'blur(10px)',
    backdropFilter: 'blur(100px)',
    marginTop: 15,
    width: SCREEN_WIDTH * 0.9,
  },
});
