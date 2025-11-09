# Solo or Squad

**Project Type:** React + Vite  

## Project Overview
**Solo or Squad** predicts whether a student prefers to work **solo** or in a **group** for projects.  

Faculty often struggle to form balanced project teams. Some students thrive in groups, while others prefer working alone. This tool helps in assigning balanced teams by predicting student preferences.

## Features
- Input Features:
  - `introversion_extraversion`
  - `risk_taking`
  - `club_top1`
  - `weekly_hobby_hours`
- Target:
  - `teamwork_preference` (Solo / Group)

## Tech Stack
- **Frontend:** React + Tailwind CSS + Framer Motion
- **Build Tool:** Vite
- **API Requests:** Axios
- **Routing:** React Router DOM

## React + Vite Setup
This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler
The React Compiler is not enabled by default because of its impact on development and build performance.  
To add it, see [React Compiler Documentation](https://react.dev/learn/react-compiler/installation).

## Expanding ESLint Configuration
For production applications, we recommend using TypeScript with type-aware lint rules.  
Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for integrating TypeScript and [`typescript-eslint`](https://typescript-eslint.io).

## Scripts
- `npm run dev` → Start development server  
- `npm run build` → Build production files  
- `npm run lint` → Lint code  
- `npm run preview` → Preview production build

## Impact
Helps faculty create **balanced and effective project teams**, improving teamwork and project outcomes.
