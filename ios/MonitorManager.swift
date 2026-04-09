import Foundation
import Combine
import SwiftUI

final class MonitorManager: ObservableObject {
    @Published var isMonitoring = false
    @Published var statusText = "Ready to start monitoring."
    @Published var drowsinessState = "safe"
    @Published var distractionState = "safe"
    @Published var audioState = "quiet"
    @Published var lastAlert = "none"

    func startMonitoring() {
        guard !isMonitoring else { return }
        isMonitoring = true
        statusText = "Monitoring active. Initializing sensors..."

        // TODO: implement camera / motion / audio monitoring logic
        // This is a stub for the initial iOS app scaffold.
        drowsinessState = "safe"
        distractionState = "safe"
        audioState = "quiet"
        lastAlert = "none"

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            self.statusText = "Driver monitoring is active."
        }
    }

    func stopMonitoring() {
        guard isMonitoring else { return }
        isMonitoring = false
        statusText = "Monitoring stopped."
    }
}
