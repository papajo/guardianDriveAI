# Guardian AI Drive Roadmap

## Summary Table

| Phase # | Name | Goal | Requirements | Success Criteria |
|----------|------|------|--------------|------------------|
| 1 | Foundation & Core Vision | Establish base architecture, background operation, and overlay UI. | BACK-01, BACK-02, BACK-03, BACK-04 | System runs in background with <10% CPU and <50MB RAM, overlay UI visible. |
| 2 | Visual Monitoring Engine | Implement high-precision eye and head tracking. | DROWS-01, DROWS-02, DROWS-03, DROWS-04, DIST-01, DIST-02, DIST-03, DIST-04 | Reliable detection of drowsiness/distraction with <5% false positive rate. |
| 3 | Audio Analysis & Intelligence | Integrate ambient audio classification for environmental safety. | AUDIO-01, AUDIO-02, AUDIO-03, AUDIO-04 | Classification of honking/screeching with <200ms latency. |
| 4 | Alerting & Feedback System | Create a high-impact notification system with user controls. | ALERT-01, ALERT-02, ALERT-03, ALERT-04, UACC-03 | Visual/Audio alerts triggered by detection engines; user can dismiss/tune settings. |
| 5 | Reporting & User Validation | Implement safety reports and validate overall user acceptance. | UACC-01, UACC-02 | >80% user acceptance rate and functional weekly safety reports. |

## Detailed Phase Descriptions

### Phase 1: Foundation & Core Vision
**Goal**: Build the structural bedrock of the application, ensuring it can exist as a background service that doesn't interfere with the primary utility (navigation).
- **Focus**: Android/iOS background service implementation, overlay window permissions, and resource optimization.
- **Success Criteria**:
    - App remains active when navigation apps are in the foreground.
    - Overlay UI is rendered correctly on top of other apps.
    - Resource monitors confirm CPU < 10% and Memory < 50MB during idle background state.

### Phase 2: Visual Monitoring Engine
**Goal**: Implement the "eyes" of the system using MediaPipe for real-time driver state analysis.
- **Focus**: Iris tracking for blink/closure rates and face orientation for distraction detection.
- **Success Criteria**:
    - Accurate detection of eye closure > 2.5s.
    - Head position tracking correctly identifies distraction (> 3s) while ignoring mirror checks.
    - Validated < 5% false positive rate through test datasets.

### Phase 3: Audio Analysis & Intelligence
**Goal**: Add environmental awareness to the safety suite, allowing the system to react to external dangers.
- **Focus**: Audio classification models for specific high-risk sounds (honking, screeching).
- **Success Criteria**:
    - High-accuracy classification of target audio patterns.
    - Processing latency remains under 200ms to ensure real-time alerting.
    - Successful integration where audio triggers heighten the urgency of visual alerts.

### Phase 4: Alerting & Feedback System
**Goal**: Ensure that detected hazards are communicated to the driver effectively without causing excessive fatigue.
- **Focus**: High-contrast UI, high-decibel audio, and a streamlined acknowledgement system.
- **Success Criteria**:
    - Visual alerts (pulsing red borders) are clearly visible in various lighting conditions.
    - Audio alerts reach 85dB equivalent.
    - All alerts are logged with precise timestamps and types.
    - Users can adjust sensitivity to personalize the experience.

### Phase 5: Reporting & User Validation
**Goal**: Close the loop by providing value back to the user and validating the system's efficacy.
- **Focus**: Weekly safety report generation and user acceptance testing (UAT).
- **Success Criteria**:
    - Weekly reports accurately summarize alert frequency and types.
    - UAT surveys show > 80% acceptance rate for the alerting mechanism.
    - Final end-to-end validation of all v1 requirements.
