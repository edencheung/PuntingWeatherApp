// This file is the settings page of our app

import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import RadioList from "@/components/RadioList";
import { backgroundImages } from "@/constants";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function Settings() {
  // "weekly" | "good" | "never"
  const [notifications, onNotificationsChange] = useState("never");
  const [preferences, onPreferenceChange] = useState
  <{ presenceOfSun: string; calmWinds: string; comfortableTemperatures: string; absenceOfRain: string; }>
  ({presenceOfSun: "3", calmWinds: "3", comfortableTemperatures: "3", absenceOfRain: "3",});
  const preferenceOptions: 
  ("presenceOfSun" | "calmWinds" | "comfortableTemperatures" | "absenceOfRain")[] 
  = ["presenceOfSun", "calmWinds", "comfortableTemperatures","absenceOfRain"];

 
  return (
    <View
      style={styles.container}
    >
      {/* Spacer for camera bump */}
      <View style={{ height: SCREEN_HEIGHT * 0.065}}></View>

      {/* Container for settings button and spacer for middle info */}
      <View style={{ height: SCREEN_HEIGHT * 0.1 }}> </View>

      {/* Container for middle info */}
      <View style={{ height: SCREEN_HEIGHT * 0.25, alignItems: "center", justifyContent: 'flex-start', paddingTop: 0, backgroundColor: 'transparent' }}>
        <View style={styles.blurContainer}>
          <RadioList 
            data={[{text: "Weekly", id: "weekly"}, {text: "Only when puntability at least 8", id: "good"}, {text: "Never", id: "never"}]}
            onSelect={onNotificationsChange}
            selectedId={notifications}
            horizontal={false}
            />
        </View>
        <View style={styles.blurContainer}>
        {preferenceOptions.map(preferenceOption => (
          <>
            <Text>{(preferenceOption.charAt(0).toUpperCase() + preferenceOption.slice(1)).replace(/([A-Z])/g, " $1")}</Text>
            <RadioList
              key={preferenceOption}
              data={[{text: "1", id: "1"}, {text: "2", id: "2"}, {text: "3", id: "3"}, {text: "4", id: "4"}, {text: "5", id: "5"}]}
              onSelect={(id) => onPreferenceChange({...preferences, [preferenceOption]: id})}
              selectedId={preferences[preferenceOption]}
              horizontal={true}
            />
          </>
        ))}
        </View>
      </View>
    </ View>
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
    aspectRatio: 395/882
  },
  backgroundColorFill: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.76,
    backgroundColor: backgroundImages.sunny.backgroundColor,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: 'flex-start',
    width: '100%',
    height: SCREEN_HEIGHT * 1.76,
    paddingTop: 0,
  },
  blurContainer: {
    backgroundColor: "lightgrey",
    padding: 20,
    opacity: 30,
    borderRadius: 10,
    backdropFilter: "blur(10px)",
    marginTop: 15,
  }
});