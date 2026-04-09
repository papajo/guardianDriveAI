# 🛠️ GSD (Get Shit Done) User Guide

This guide explains how to effectively use the GSD framework to manage and execute software projects with Claude Code. GSD is designed for **hierarchical, agentic development**, moving from high-level vision to granular, verified execution.

---

## 🎯 The Core Philosophy
GSD replaces "blind coding" with a structured pipeline:
**Vision** $\rightarrow$ **Requirements** $\rightarrow$ **Roadmap** $\rightarrow$ **Detailed Plan** $\rightarrow$ **Execution** $\rightarrow$ **Verification**.

By decoupling *planning* from *execution*, GSD ensures that the agent understands the "Why" and "How" before a single line of code is written, drastically reducing hallucinations and regression errors.

---

## 🛣️ The "Happy Path" (Primary Workflow)

For most features or new projects, follow this sequence:

1.  **`/gsd-new-project`**: Initialize the project. This is the most critical step. It handles questioning, research, and creates the `.planning/` foundation.
2.  **`/gsd-plan-phase <number>`**: Create a detailed execution plan for a specific phase. This breaks the phase into "Waves" of actionable tasks.
3.  **`/gsd-execute-phase <number>`**: The engine. This spawns subagents to implement the plans in parallel waves.
4.  **`/gsd-verify-work <number>`**: Conduct User Acceptance Testing (UAT) to ensure the requirements were actually met.
5.  **`/gsd-ship <number>`**: Create a clean PR branch and push the completed phase work.

---

## ⚡ The "Fast Lane" (Ad-hoc Tasks)

Not every change needs a full phase. Use these for speed:

| Command | When to use | Overhead | Result |
| :--- | :--- | :--- | :--- |
| **`/gsd-fast`** | Typos, config tweaks, single-line fixes. | Zero | Atomic commit + log to `STATE.md`. |
| **`/gsd-quick`** | Small features or refactors that take < 1 hour. | Low | Local `PLAN.md` $\rightarrow$ Implementation $\rightarrow$ `SUMMARY.md`. |
| **`/gsd-do`** | "I know what I want, but don't know the GSD command." | Minimal | Intelligent routing to the right `/gsd-*` command. |

---

## 🛠️ Advanced Utility & Maintenance

### 🔍 Debugging & Troubleshooting
When something breaks, don't just "try to fix it." Use:
- **`/gsd-debug "issue description"`**: Starts a systematic scientific investigation (Evidence $\rightarrow$ Hypothesis $\rightarrow$ Test). It creates a persistent debug log that survives `/clear`.

### 📈 Lifecycle Management
- **`/gsd-progress`**: Your "Where am I?" button. Shows completion % and routes you to the next logical step.
- **`/gsd-new-milestone`**: Use this when you've completed a major version (e.g., v1.0) and want to define the goals for the next one.
- **`/gsd-cleanup`**: Use this after completing a milestone to archive old phase directories and keep `.planning/` clean.

### 💡 Idea Capture
- **`/gsd-note "idea"`**: Instant, zero-friction capture of a thought.
- **`/gsd-add-todo`**: Promote a note or a conversation thread into a structured task.

---

## 🌟 Pro Tips for Maximum Effectiveness

### 1. Trust the "Discuss" Phase
Before running `/gsd-plan-phase`, use **`/gsd-discuss-phase`**. It's the best way to align your vision with Claude's interpretation *before* a detailed plan is written, preventing wasted tokens and rewrite loops.

### 2. Use "YOLO Mode" Sparingly
In `.planning/config.json`, `mode: "yolo"` auto-approves decisions. Use this for trivial projects. For critical systems (like Guardian AI Drive), stay in `interactive` mode to maintain oversight of the architecture.

### 3. Leverage `/gsd-review`
Before executing a complex phase, run `/gsd-review`. This invokes other AI models to peer-review the plan, catching edge cases or architectural flaws that a single model might miss.

### 4. The Power of `/gsd-next`
If you're returning to a project after a break, just run `/gsd-next`. It reads `STATE.md` and the roadmap to tell you exactly what the next logical action is.

---

## 📁 The .planning/ Directory Structure
*Your project's "Brain"*
- `PROJECT.md`: The Vision (The "Why")
- `REQUIREMENTS.md`: The Specs (The "What")
- `ROADMAP.md`: The Strategy (The "When")
- `STATE.md`: The Memory (The "Where we are")
- `phases/`: The Execution (The "How")
