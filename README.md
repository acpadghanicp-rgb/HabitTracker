# StreakPulse — Habit Streak Tracker
**Course:** Programming Skills - I Lab (`CS309PCC06`)  
**Department:** Computer Science & Engineering  
**Institution:** P. R. Pote Patil College of Engineering & Management, Amravati  
**Practical No. 11:** Habit Streak Tracker — A React-based web application for creating, tracking, and reviewing daily habits.

---

## 🌟 Overview
**StreakPulse** is a modern, glassmorphic Habit Streak Tracker built with **React 19** and **Modern JavaScript (ES6+)**. It emphasizes consistency in daily routines, provides real-time streak calculations, interactive 7-day completion matrices, milestone sound effects, confetti animations, and persistent browser storage.

---

## 🎯 Mapping to Programming Skills - I (P-Skills) Concepts

| Practical Module | Concept Studied in Lab | Implementation in StreakPulse |
| :--- | :--- | :--- |
| **Practical 01 & 02** | **JavaScript Functions & Arrow Functions** | Modular helper functions with concise syntax, implicit returns, and lexical scoping in [`src/utils/dateUtils.js`](src/utils/dateUtils.js) & [`src/utils/soundEffects.js`](src/utils/soundEffects.js). |
| **Practical 03** | **JavaScript Objects** | Dynamic property updates, object destructuring, `Object.keys()`, `Object.assign()`, and spread syntax in state updates. |
| **Practical 04** | **Array Methods** | Extensive usage of `filter`, `map`, `reduce`, `some`, `includes`, `sort`, and `concat` for streak algorithms and filtering. |
| **Practical 05** | **Callback Functions** | Asynchronous audio synthesizer timers, event-driven state transitions, and functional state updater callbacks. |
| **Practical 06 & 07** | **React Fundamentals & HTML Rendering** | Virtual DOM rendering with `createRoot()`, JSX templates, and unidirectional data flow. |
| **Practical 08** | **Component Composition & Nesting** | Hierarchy of decomposed components: `Navbar`, `StatsDashboard`, `HabitForm`, `HabitFilters`, `HabitCard`, `WeeklyOverview`, `Footer`. |
| **Practical 09** | **React Hooks** | Built-in hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) alongside custom hooks [`useToggle`](src/hooks/useToggle.js), [`useLocalStorage`](src/hooks/useLocalStorage.js), and [`useTheme`](src/hooks/useTheme.js). |
| **Practical 10** | **DOM Event Handling** | Reactive form submission (`onSubmit`), keyboard shortcuts, click listeners (`onClick`), and audio triggers. |

---

## ✨ Key Features (Practical No. 11 Requirements)

1. **User Authentication Interface:** Sign-up, login, logout, and instant Guest Demo mode persisted in browser `localStorage`.
2. **Habit Creation & Validation:**
   - Prevents blank/empty habit names.
   - Prevents duplicate habit names.
   - Category tags & accent color customizer.
3. **Habit Editing & Deletion:** In-place habit updating with category and color changes; deletion with confirmation.
4. **Daily Completion & Undo:** Instant toggle for today's habits with tactile Web Audio synthesized chimes.
5. **Streak Calculation Engine:**
   - **Current Streak:** Calculates unbroken consecutive active days.
   - **Best Streak:** Identifies all-time longest streak.
6. **7-Day Interactive Matrix & History Strip:** Visual daily indicators allowing past day backfilling and inspection.
7. **Performance Analytics:** Today's completion %, active streaks count, lifetime check-ins, and motivational cues.
8. **Celebration Feedback:** Multidirectional confetti burst and triumphant audio fanfare when 100% daily goals are achieved.
9. **Dual Theme Support:** Light mode and OLED Dark mode with smooth transitions.
10. **Data Backup:** One-click JSON export and import for habit persistence across browsers.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm / npx

### Installation & Launch
```bash
# Navigate to project directory
cd C:\Users\Admin\.gemini\antigravity\scratch\habit-streak-tracker

# Start Vite Development Server
npm run dev
```

Open your browser at `http://localhost:5173` (or the port displayed in your terminal).
