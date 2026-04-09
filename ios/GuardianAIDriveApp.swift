import SwiftUI

@main
struct GuardianAIDriveApp: App {
    @StateObject private var monitorManager = MonitorManager()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(monitorManager)
        }
    }
}
