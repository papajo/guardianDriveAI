# Guardian AI Drive — iOS Scaffold

This folder contains a future iOS app scaffold for Guardian AI Drive.

## What is included

- SwiftUI app skeleton files
- A simple monitoring UI with start/stop controls
- A stubbed monitoring manager for future camera/audio integration
- Basic app metadata (`Info.plist`)

## How to use this scaffold

The code is intentionally lightweight so it can be imported into an Xcode project.

### Recommended workflow

1. Open Xcode.
2. Create a new iOS app project.
   - Product Name: `GuardianAIDrive`
   - Interface: `SwiftUI`
   - Language: `Swift`
   - Bundle Identifier: `com.guardianai.drive.ios`
3. Add the files from this folder to the new project:
   - `GuardianAIDriveApp.swift`
   - `ContentView.swift`
   - `MonitorManager.swift`
   - `Info.plist` (or merge keys into the generated plist)
4. Set the deployment target to iOS 16 or later.
5. Configure signing with your development team.

## iOS App Store preparation notes

- Add privacy usage descriptions to `Info.plist` before camera/microphone access:
  - `NSCameraUsageDescription`
  - `NSMicrophoneUsageDescription`
  - `NSPhotoLibraryUsageDescription` (if adding image capture later)
- Create an App Store Connect record for the app.
- Provide app metadata, screenshots, and a privacy policy.
- Use a real app icon and launch screen.
- Test on a physical device before submitting.

## Future iOS feature ideas

- Local camera-based driver monitoring using Vision and AVFoundation
- Face landmarks, blink detection, head position, and attention tracking
- Background-safe foreground UI for alerts while driving
- Session logging and export
- Privacy-first local processing only

## Notes

This folder is a starting point, not a complete App Store-ready product. It is designed to help you begin iOS development in parallel with the existing Android/web work.
