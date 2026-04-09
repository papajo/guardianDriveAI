# Guardian AI Drive

A native Android proof-of-concept for the Guardian AI Drive driver monitoring app.

## What is included

- Android Gradle project scaffold in `android/`
- `MainActivity` with permission guidance for overlay and battery optimization
- `GuardianForegroundService` with persistent foreground notification
- Basic overlay stub that can display a floating monitoring indicator above other apps
- Planning and requirements documents stored in `.planning/`

## Build & Test

### Cloud Build (Recommended for minimal disk usage)

1. Connect your GitHub repo to BrowserStack App Automate
   - Go to [https://www.browserstack.com/app-automate/configure-ci](https://www.browserstack.com/app-automate/configure-ci)
   - Select GitHub and authorize
   - Link the `guardianDriveAI` repo

2. Push to `main` branch
   ```bash
   git push origin main
   ```
   BrowserStack detects the `.browserstack.yml` config and builds remotely

3. Test on cloud devices
   - Log into BrowserStack App Automate
   - Find your build and launch it on a Google Pixel 8 (or any device)
   - Grant overlay permission and battery optimization exemption when prompted
   - Start the monitoring service with the app buttons

### Local Build (requires Android SDK ~10-15 GB)

If you have the Android SDK installed locally:

```bash
cd android
gradle assembleDebug
```

This generates `app/build/outputs/apk/debug/app-debug.apk`
