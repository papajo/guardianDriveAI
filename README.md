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

### Web Proof of Concept

A web-based prototype is available in the `web/` folder. It uses the webcam and microphone to simulate drowsiness/distraction detection with face-api.js (more browser-compatible than MediaPipe).

To run locally:

```bash
cd web
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

**Features:**
- Face detection and landmark tracking
- Drowsiness detection (eye closure, blink rate)
- Distraction detection (head turn)
- Audio monitoring for loud sounds
- Real-time visual feedback

**Troubleshooting:**
- **Permission issues**: Allow camera and microphone in browser settings
- **Face detection fails**: Ensure good lighting and face centered in camera
- **Audio not working**: Check microphone permissions and volume
- **Works in**: Chrome, Firefox, Safari, Edge

### Local Android Build (requires Android SDK ~10-15 GB)

If you have the Android SDK installed locally:

```bash
cd android
gradle assembleDebug
```

This generates `app/build/outputs/apk/debug/app-debug.apk`

### iOS Scaffold

An iOS SwiftUI scaffold is available in the `ios/` folder for future App Store development.

- `ios/README.md` contains setup guidance and App Store preparation notes
- `ios/GuardianAIDriveApp.swift`, `ios/ContentView.swift`, and `ios/MonitorManager.swift` contain the initial app shell
- `ios/Info.plist` includes basic app metadata and camera/microphone usage descriptions

Open an Xcode project and add these files to start the iOS implementation.
