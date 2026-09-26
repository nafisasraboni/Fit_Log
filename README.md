<div align="center">

# 🏋️ FitLog — Workout Library & Daily Planner

**FitLog** is a modern, high-performance, dark-themed fitness web application built for fitness enthusiasts to browse professional workouts, lock exercises into a structured daily plan, and track weekly performance seamlessly.

🔗 **Live Demo:** [https://fit-log.sraboni.dev/](https://fit-log.sraboni.dev/)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Technologies & Stack](#-technologies--stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started-locally)
- [Author](#-author)

---

## 🎯 About The Project

FitLog serves as a no-nonsense gym companion that bridges the gap between raw workout discovery and daily routine management. Designed with precision using Figma specifications, it offers smooth routing, robust local state persistence, responsive layouts, and interactive feedback through toast notifications.

---

## ⭐ 5 Key Features

1. **Dynamic Workout Library & Search:** Browse a comprehensive collection of lifts covering every major muscle group fetched directly from the FitLog API, equipped with real-time name and tag-based filtering.
2. **Interactive Daily Plan & Capping:** Add up to 5 custom lifts to your daily routine (with strict daily cap limits and disabled states) or save workouts for later with live-updating metrics summary (Exercises, Minutes, and Calories).
3. **Advanced Sorting & Tracking:** Instantly sort your current plan or saved list by **Duration**, **Calories**, or **Rating**, and toggle the "Mark as Done" or "Remove" actions with instant custom toast alerts.
4. **Persistent State Management:** User selections, customized routines, and saved items are securely synchronized with browser `LocalStorage`, guaranteeing data retention across browser reloads.
5. **Figma-Inspired Responsive UI & 404 Safety:** Built with a sleek dark gym aesthetic featuring precise spacing, typography (Oswald & custom sans), dynamic badge counters in the navbar, a mobile hamburger drawer, and a dedicated custom 404 error page.

---

## 🚀 Technologies Used

* **Framework:** Next.js (App Router) for server components, fast page navigation, and optimal SSR performance.
* **Styling & Design:** Tailwind CSS for a custom dark-theme aesthetic, responsive grid layouts, and mobile-first design.
* **State Management:** React Context API combined with React Hooks (`useState`, `useEffect`) for global data synchronization.
* **Persistence:** Browser `LocalStorage` for saving user workout logs across sessions.
* **UI Enhancements:** React Toastify for rich alert notifications & React Icons for modern iconography.

---

## 📂 Project Architecture

```text
fit-log/
├── public/
│   └── assets/              # Static images (banner.png, logo.png)
├── src/
│   ├── app/
│   │   ├── components/      # Reusable UI components (Navbar, Hero, Library, Footer)
│   │   ├── my-plan/         # My Plan & Saved workouts page with tabs and metrics
│   │   ├── workout/
│   │   │   └── [id]/        # Dynamic workout detail page (page.jsx & WorkoutClient.jsx)
│   │   ├── favicon.ico      # Site favicon icon
│   │   ├── globals.css      # Tailwind base and custom theme styles
│   │   ├── layout.js        # Root layout wrapping AppProvider and ToastContainer
│   │   ├── loading.jsx      # Global suspense loading indicator
│   │   ├── not-found.jsx    # Custom 404 error handling page
│   │   └── page.js          # Home page fetching workout library API
│   └── context/
│       └── AppContext.js    # Global context provider for plan & saved state logic
├── .gitignore               # Git ignored files and directories
├── AGENTS.md                # Agent instructions and context
├── CLAUDE.md                # Claude specific rules
├── eslint.config.mjs        # ESLint configuration
├── jsconfig.json            # JavaScript path alias configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation

```
---

# 🛠️ Getting Started Locally
To run this project locally on your machine, follow these steps:

## Clone the repository:

Bash
git clone [https://github.com/your-username/fit-log.git](https://github.com/your-username/fit-log.git)
Navigate to the project directory:

Bash
cd fit-log
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your web browser.

---

# 👤 Author
## Nafisa Tabassum Sraboni

Website: https://fit-log.sraboni.dev/

© 2026 FitLog — Workout Library. Train hard, log honest.
---
