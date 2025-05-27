# Punting Weather App

This is an app to allow punters in Cambridge to check the weather conditions
so they can more easily decide on/plan their punting.

## Steps to run

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project
uses [file-based routing](https://docs.expo.dev/router/introduction).

The application runs for development on Linux, Windows, and Mac (although different
platforms may affect which devices can be emulated).

All libraries used are detailed in the `package.json` file and will automatically be installed
when `npm install` is run as described above.

## Fonts

This app uses fonts stores in the `assets/fonts/` directory:

- `Quicksand-Bold.ttf`
- `cherrybombone-regular.ttf`

These fonts can be loaded using [`expo-font`] package.

To install it, run:

```bash
npm install expo-font
```
