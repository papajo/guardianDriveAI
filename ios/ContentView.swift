import SwiftUI

struct ContentView: View {
    @EnvironmentObject var monitorManager: MonitorManager

    var body: some View {
        VStack(spacing: 24) {
            Text("Guardian AI Drive")
                .font(.largeTitle)
                .fontWeight(.bold)

            Text(monitorManager.statusText)
                .font(.body)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)

            HStack(spacing: 20) {
                Button(action: monitorManager.startMonitoring) {
                    Text("Start Monitor")
                        .fontWeight(.semibold)
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(ActionButtonStyle(color: .green))
                .disabled(monitorManager.isMonitoring)

                Button(action: monitorManager.stopMonitoring) {
                    Text("Stop Monitor")
                        .fontWeight(.semibold)
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(ActionButtonStyle(color: .red))
                .disabled(!monitorManager.isMonitoring)
            }
            .padding(.horizontal)

            VStack(alignment: .leading, spacing: 12) {
                statusRow(title: "Drowsiness", value: monitorManager.drowsinessState)
                statusRow(title: "Distraction", value: monitorManager.distractionState)
                statusRow(title: "Audio", value: monitorManager.audioState)
                statusRow(title: "Last alert", value: monitorManager.lastAlert)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
            .background(Color(.secondarySystemBackground))
            .cornerRadius(16)

            Spacer()
        }
        .padding()
    }

    @ViewBuilder
    private func statusRow(title: String, value: String) -> some View {
        HStack {
            Text(title)
                .fontWeight(.semibold)
            Spacer()
            Text(value)
                .foregroundColor(.secondary)
        }
    }
}

struct ActionButtonStyle: ButtonStyle {
    let color: Color

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(color.opacity(configuration.isPressed ? 0.8 : 1.0))
            .foregroundColor(.white)
            .cornerRadius(12)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(MonitorManager())
    }
}
