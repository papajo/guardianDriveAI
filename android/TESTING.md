# Guardian AI Drive — Android Testing Checklist

Use this checklist after opening the Android project in Android Studio and running it for the first time.

## First Run Checklist

### 1. Project Sync
- [ ] Android Studio opens the `android/` folder without errors
- [ ] Gradle sync completes successfully (check bottom status bar)
- [ ] No build errors in the project

### 2. Device/Emulator Setup
- [ ] Emulator is running Android 14/API 34 (or physical device with Android 8+)
- [ ] Device is unlocked and connected (USB debugging enabled for physical devices)

### 3. Initial App Launch
- [ ] App installs and launches without crashing
- [ ] Main screen shows "Ready to start monitoring." status
- [ ] Start and Stop buttons are visible and enabled

### 4. Permission Flows
- [ ] Tap "Start" → Overlay permission dialog appears
- [ ] Grant overlay permission when prompted
- [ ] Battery optimization exemption dialog appears
- [ ] Grant battery exemption when prompted
- [ ] Service starts: Status changes to "Monitoring active. Guardian AI service is running."

### 5. Service Behavior
- [ ] Foreground notification appears in status bar
- [ ] Tapping notification opens the app
- [ ] App can be backgrounded while service runs
- [ ] Tap "Stop" → Service stops, status changes to "Monitoring stopped."

### 6. Overlay Stub (Current Implementation)
- [ ] No visible overlay yet (this is a scaffold)
- [ ] Check logcat for service lifecycle messages

## Troubleshooting

- **Build fails**: Check SDK versions in Android Studio SDK Manager
- **Emulator slow**: Use hardware acceleration (Intel HAXM or Hypervisor)
- **Permissions denied**: Re-run app and grant manually in Settings
- **Service doesn't start**: Check device battery settings and overlay permissions

## Next Steps After Testing

- [ ] Confirm scaffold works as expected
- [ ] Ready to add camera processing and real monitoring logic
- [ ] Consider adding ML Kit or TensorFlow Lite for face detection

## Notes

This is a basic scaffold test. The app currently has no real camera/audio processing — it's ready for enhancement.