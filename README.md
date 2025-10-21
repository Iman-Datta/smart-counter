# 🧮 Self-Learning Digital Counter Simulator

## 🔍 Project Overview
The **Self-Learning Digital Counter Simulator** is an interactive web-based project that demonstrates how an **AI logic can adaptively control a digital counter’s mode**.  
The system allows counting in **Up**, **Down**, and **Mod-N** modes, and features an **AI Mode** that automatically learns the user’s pattern of interaction and adapts accordingly.

This project simulates the concept of an **adaptive Finite State Machine (FSM)** that changes its counting behavior dynamically based on usage patterns.

---

## 🎯 Objective
To design a **self-learning counter** that intelligently switches between:
- **Up Counter**
- **Down Counter**
- **Mod-N Counter**

based on the **user’s previous actions and control signals**.

---

## ⚙️ Key Features
- **Interactive Counter Display** – shows the live counter value with animations.  
- **Four Operational Modes:**
  - **Up Mode:** Increments count continuously.
  - **Down Mode:** Decrements count continuously.
  - **Mod-N Mode:** Counts from 0 to N–1, then resets to 0 (user inputs N).
  - **AI Mode:** Automatically detects user pattern and chooses mode accordingly.
- **AI Learning Logic:**
  - Observes the user’s last 5 actions.
  - Detects which mode was used most.
  - Switches to that mode automatically when AI Mode is activated.
- **AI Decision Log:** Displays the reasoning behind AI’s mode selection.
- **Light/Dark Mode Toggle**
- **Project Report Page:** Explains the concept of counters and FSM transitions.

---

## 🧰 Technology Stack
- **React (with Vite)** – for fast, modern frontend development  
- **TypeScript** – for type-safe and reliable code  
- **Tailwind CSS + shadcn/ui** – for responsive and elegant UI components  

---

## 🧠 System Flow
1. The user manually interacts with the counter using Up, Down, or Mod-N buttons.  
2. The system records the last five actions.  
3. Once at least five inputs are given, the **AI Mode** becomes active.  
4. When AI Mode is enabled, it analyzes the recent pattern:
   - Mostly “Up” actions → switches to **Up Counter**  
   - Mostly “Down” actions → switches to **Down Counter**  
   - Mostly “Mod” actions → continues **Mod-N Counter**  
5. The result is displayed dynamically, and the **AI Decision Log** updates to show how the mode was chosen.

---

## 💻 How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone <YOUR_GIT_REPOSITORY_URL>