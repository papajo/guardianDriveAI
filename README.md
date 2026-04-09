# Guardian AI Drive

A native Android proof-of-concept for the Guardian AI Drive driver monitoring app.

## What is included

- Android Gradle project scaffold in `android/`
- `MainActivity` with permission guidance for overlay and battery optimization
- `GuardianForegroundService` with persistent foreground notification
- Basic overlay stub that can display a floating monitoring indicator above other apps
- Planning and requirements documents stored in `.planning/`

## Next step

1. Open the project in Android Studio or run Gradle from the `android/` directory.
2. Grant overlay permission and battery optimization exemption when prompted.
3. Start the monitoring service with the app buttons.

## Build

From the `android/` folder:

```bash
# Use your installed Gradle or Android Studio
./gradlew assembleDebug
```

If the Gradle wrapper is not available, use a local Gradle installation:

```bash
gradle assembleDebug
```
