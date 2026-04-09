# 📘 GSD Operational Handbook

This handbook is the professional guide for managing software lifecycles using the **Get Shit Done (GSD)** framework. It is designed for developers, architects, and engineers who require precision, predictability, and structural integrity.

---

## 🧭 I. The Decision Matrix
*Stop guessing. Use this matrix to select your entry point.*

| If you are... | And your goal is... | Use this command |
| :--- | :--- | :--- |
| **Starting a brand new project** | To go from Idea $\rightarrow$ Roadmap | `/gsd-new-project` |
| **Working in an existing repo** | To bring it under GSD control | `/gsd-map-codebase` $\rightarrow$ `/gsd-new-milestone` |
| **In the middle of a phase** | To implement the next logical step | `/gsd-next` |
| **Working on a tiny change** | A typo, a single config line, or a one-off fix | `/gsd-fast` |
| **Building a small/medium feature** | A standalone addition that doesn't need a phase | `/gsd-quick` |
| **Facing a complex bug** | Systematic, state-persistent debugging | `/gsd-debug` |
| **Stuck/Lost** | To see where you are and what's next | `/gsd-progress` |

---

## 🏗️ II. The Hierarchy of Work
*GSD operates on a strict hierarchy. Respecting these boundaries prevents "Requirement Drift" and technical debt.*

1.  **Task (The Atom):** A single technical action (e.g., "Write the `auth_service.py`").
2.  **Wave (The Group):** A collection of related tasks that move a specific technical capability forward (e.g., "Implement Authentication").
3.  **Phase (The Milestone Boundary):** A collection of Waves that satisfies a specific set of requirements (e.g., "Phase 1: Foundation").
4.  **Milestone (The Release):** A collection of Phases that results in a deployable version (e.g., "v1.0").

### 🛑 The Golden Rule of Execution
**Never skip a Phase.** 
A Phase is not just a "folder of work"; it is a **Validation Gate**. You must satisfy the "Success Criteria" for Phase $N$ before moving to Phase $N+1$. If you jump from Phase 1 to Phase 3, you will inevitably find that Phase 3's requirements depend on a foundation that was never actually verified.

---

## 🔄 III. Operational Scenarios

### 🏗️ Scenario A: The Brownfield Transition
*Problem: You have a working project, but it's a mess. You want to start using GSD to manage its next evolution.*

**The Workflow:**
1.  **Map the Chaos:** Run `/gsd-map-codebase`. This creates the `.planning/codebase/` intelligence files.
2.  **Define the New Era:** Run `/gsd-new-milestone "v2.0 Evolution"`. This treats the existing code as the "Validated" baseline and allows you to plan the *next* set of features.
3.  **Don't Re-plan the Past:** Use the codebase map to infer what is already done, so your new Roadmap focuses on *delta* (what is changing).

### 📉 Scenario B: The Mid-Flight Pivot
*Problem: You are halfway through Phase 2, and the stakeholder says, "Actually, we don't need Feature X; we need Feature Y instead."*

**The Workflow:**
1.  **Stop the Line:** Do not just start coding Feature Y.
2.  **Modify the Truth:** Update `.planning/REQUIREMENTS.md` to move Feature X to "Out of Scope" and add Feature Y to "Active."
3.  **Re-map the Roadmap:** Use `/gsd-insert-phase` to add a new phase for Feature Y, or `/gsd-remove-phase` if Feature X was a whole phase.
4.  **Update the Plan:** Re-run `/gsd-plan-phase` for the current phase to ensure the execution plan aligns with the new requirements.

### 🚨 Scenario C: The Emergency Regression
*Problem: You completed Phase 2 and moved to Phase 3, but a critical bug is found in the Phase 2 logic.*

**The Workflow:**
1.  **Do NOT modify Phase 2:** Never go back and edit completed phase directories. This destroys your historical record and audit trail.
2.  **Inject a Patch Phase:** Use `/gsd-insert-phase 2.1 "Fix Critical Regression in Visual Engine"`.
3.  **Execute and Verify:** Run `/gsd-plan-phase 2.1` and `/gsd-execute-phase 2.1`.
4.  **Resume:** Once 2.1 is complete, return to Phase 3.

---

## 🧠 IV. Context & Memory Management

### 🛡️ Preventing "Agent Amnesia"
Agents have limited context windows. If you work in long sessions, the agent *will* forget why it made a certain decision.

*   **Use `/gsd-pause-work`**: Before ending a session, always run this. It creates `.continue-here.md`, which acts as a "save game" file.
*   **The Source of Truth**: If you and the agent disagree, **the `.planning/` files always win.** If the code does X but the `REQUIREMENTS.md` says Y, the agent is wrong. Update the requirement or the code, but never leave them in conflict.

### 🔍 The Debugging Loop
When using `/gsd-debug`, treat it like a scientific experiment:
1.  **Observe**: Provide the symptom.
2.  **Hypothesize**: Let the agent propose *why* it's happening.
3.  **Test**: Run the specific test case.
4.  **Resolve**: Only when the test passes do you move the issue to `.planning/debug/resolved/`.

---
*Version 1.0 | Last updated: 2026-04-09*
