# Guardian AI Drive

## What This Is
A safety app that transforms a standard smartphone into a driver monitoring system, detecting drowsiness and distraction to prevent accidents.

## Why This Exists
Distracted driving is a leading cause of accidents worldwide. Current solutions are either expensive hardware systems or lack precision. Guardian AI Drive leverages modern smartphone capabilities to provide affordable, accurate driver monitoring.

## Problem Statement
Drivers frequently experience drowsiness and distraction, leading to delayed reaction times and increased accident risk. Current solutions fail to provide:
- Real-time monitoring in background while using navigation
- High-precision detection without specialized hardware
- Alerts that actually capture attention
- Metrics for fleet management and insurance purposes

## Target Audience
- Commuters in daily driving scenarios
- Long-haul truck drivers
- Fleet management companies
- Parents of teen drivers

## Success Metrics
- False positive rate (alerts when driver is actually safe) – Target: <5%
- User notification acceptance rate
- Partnership interest from fleet insurance providers

## Core Value
The ONE thing that must work: Drivers are alerted before they become a hazard, with minimal false alarms that cause alert fatigue.

## Constraints
- Must run in "background mode" or overlay while navigation apps are running
- High-contrast visual and audio alarms must cut through normal noise
- Must work on standard smartphones without specialized hardware
- Privacy-conscious design (data should stay on device)

## Key Decisions
| Decision | Rationale | Outcome |
|----------|-----------|---------|
| MediaPipe Face Mesh with iris tracking | Provides high precision for eye tracking without specialized hardware | — Pending |
| Audio classification for environmental sounds | Adds critical context beyond visual monitoring | — Pending |
| Background/overlay capability | Meets real-world use case where drivers use navigation apps | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-08 after initialization*