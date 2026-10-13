## Weather App

### Run the updated app

Requires Node.js 22.13 or newer (Node 22 LTS recommended) and npm. The app uses Expo SDK 57 with matching React Native and Expo modules.

1. Run `npm ci`.
2. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_OPENWEATHER_API_KEY` to your own OpenWeather API key.
3. Run `npm start` for Expo Go, or `npm run web` for the browser. Allow foreground location access. Browser geolocation needs localhost or HTTPS.

The previous key was committed publicly. Revoke/rotate it in OpenWeather before using this app again. `.env` is ignored by Git, but `EXPO_PUBLIC_` values are included in the app bundle and are **not secrets**. For a production service that needs a private key, call OpenWeather through your own backend with server-side credentials and rate limits.

### Verification and dependency updates

- `npm test`: request success, invalid responses, authentication errors, network failure, and cancellation.
- `npx expo install --check`: verify the SDK's dependency versions.
- `npx expo-doctor`: verify Expo configuration.
- `npm run export`: export Android, iOS, and web JavaScript bundles; this is not a signed native build.
- `npm audit`: check dependencies against the current advisory database.

Commit `package-lock.json` with dependency changes and use `npm ci` for reproducible installs. Review weekly Dependabot updates and validate Expo module upgrades together. A clean audit today cannot prevent new advisories in the future.

### Original project notes
weather report by Expo 

# First, my weather app is based on expo. It is more convenient than react-native

# Second, the major code files are three. {App.js} {Loading.js} {Weather.js}

  I use "expo-location"API and get current position and show correct weather tempearature. 

  I have already learned react.js and it's the first time to make a app by expo. 

  My weather app is not very big, but it has a big impact on me.

# Third, have a nice day!  

# Result:(the gift loading needs some time XD)

![weather report](https://github.com/donghero/WeaterApp/blob/master/assets/weather.gif)
