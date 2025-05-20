import AsyncStorage from "@react-native-async-storage/async-storage";

export type NotificationPrefOptions = "weekly" | "good" | "never";

export interface UserPrefs {
  presenceOfSun: number;
  calmWinds: number;
  comfortableTemperatures: number;
  absenceOfRain: number;
  notifications: NotificationPrefOptions;
  idealTemperature: number;
}

export async function updateUserPrefs(prefs: UserPrefs) {
  await AsyncStorage.setItem('usersPrefs', JSON.stringify(prefs));
}

export async function getUserPrefs() {
  const jsonValue = await AsyncStorage.getItem('usersPrefs');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}