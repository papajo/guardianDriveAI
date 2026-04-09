# Guardian AI Drive Requirements

## v1 Requirements

### Drowsiness Detection
- [ ] **DROWS-01**: System shall detect eye closure using MediaPipe Face Mesh iris tracking
- [ ] **DROWS-02**: System shall monitor blink frequency to identify drowsiness patterns
- [ ] **DROWS-03**: System shall trigger alert when eye closure exceeds 2.5 seconds or blink rate drops below 12 per minute
- [ ] **DROWS-04**: System shall maintain <5% false positive rate for drowsiness detection

### Distraction Alert
- [ ] **DIST-01**: System shall detect head position relative to road center using face orientation
- [ ] **DIST-02**: System shall trigger alert when head is turned away from road for >3 seconds
- [ ] **DIST-03**: System shall differentiate between checking mirrors/side windows vs. actual distraction
- [ ] **DIST-04**: System shall maintain <5% false positive rate for distraction detection

### Audio Environment Analysis
- [ ] **AUDIO-01**: System shall classify ambient audio for aggressive honking detection
- [ ] **AUDIO-02**: System shall classify ambient audio for tire screeching detection
- [ ] **AUDIO-03**: System shall heighten visual/audio alerts when dangerous audio patterns detected
- [ ] **AUDIO-04**: System shall process audio classification with <200ms latency

### Background Operation
- [ ] **BACK-01**: System shall run continuously in background while foreground navigation apps active
- [ ] **BACK-02**: System shall provide overlay UI visible above other applications
- [ ] **BACK-03**: System shall maintain <10% CPU usage during background operation
- [ ] **BACK-04**: System shall maintain <50MB memory footprint during background operation

### Alerting System
- [ ] **ALERT-01**: System shall provide high-contrast visual alerts (red border/pulsing)
- [ ] **ALERT-02**: System shall provide audio alerts at 85dB equivalent through device speaker
- [ ] **ALERT-03**: System shall allow user to acknowledge/dismiss alerts with single tap
- [ ] **ALERT-04**: System shall log all alerts with timestamp and type for review

### User Acceptance
- [ ] **UACC-01**: System shall achieve >80% user acceptance rate for alert notifications
- [ ] **UACC-02**: System shall provide weekly safety report showing alert frequency and types
- [ ] **UACC-03**: System shall allow adjustment of sensitivity settings for different users

## v2 Requirements (Deferred)
- [ ] **FLEET-01**: Cloud synchronization for fleet management dashboard
- [ ] **FLEET-02**: Historical trend analysis for driver safety scoring
- [ ] **FLEET-03**: Integration with telematics systems via API
- [ ] **ADAS-01**: Integration with vehicle CAN bus for additional data sources
- [ ] **ADAS-02**: Cooperation with existing ADAS systems (lane departure, forward collision)

## Out of Scope
- [Hardware-specific optimizations] — Requires specialized sensors beyond smartphone capabilities
- [Medical diagnosis] — System is for alerting only, not medical condition detection
- [Vehicle control] — System provides alerts only, does not intervene in vehicle operation
- [Offline voice commands] — Privacy concern; all processing remains on-device without voice activation

## Traceability Section

| REQ-ID | Phase |
|--------|-------|
| BACK-01 | 1 |
| BACK-02 | 1 |
| BACK-03 | 1 |
| BACK-04 | 1 |
| DROWS-01 | 2 |
| DROWS-02 | 2 |
| DROWS-03 | 2 |
| DROWS-04 | 2 |
| DIST-01 | 2 |
| DIST-02 | 2 |
| DIST-03 | 2 |
| DIST-04 | 2 |
| AUDIO-01 | 3 |
| AUDIO-02 | 3 |
| AUDIO-03 | 3 |
| AUDIO-04 | 3 |
| ALERT-01 | 4 |
| ALERT-02 | 4 |
| ALERT-03 | 4 |
| ALERT-04 | 4 |
| UACC-03 | 4 |
| UACC-01 | 5 |
| UACC-02 | 5 |


---
*Requirements defined: 2026-04-08*