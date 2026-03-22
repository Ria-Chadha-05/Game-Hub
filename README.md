<div align="center">

# 🎮 Game Hub

**A modern, dark-themed browser game hub built with Next.js 15, TypeScript, and a fully component-driven architecture.**

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

[Overview](#-overview) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Project Structure](#-project-structure) · [Running Locally](#-running-locally) · [Adding a Game](#-adding-a-game) · [Deployment](#-deployment)

**🔗 Live Site:** [gamehub-by-ria.vercel.app](https://gamehub-by-ria.vercel.app/)
</div>

---

## 📌 Overview

Game Hub is a fully custom-built browser game hub featuring four classic games — **Tic Tac Toe, Snake, Whack A Mole, and Memory Cards** — all playable instantly with no downloads or sign-ups.

The architecture follows a clean **per-route component pattern**: every game lives in its own `app/<game>/` route with a self-contained `components/` folder. Shared UI (header, footer, icons) lives in `src/components/` and is reused across all routes. Adding a new game means adding one new route — nothing else needs to change.

Built for performance, clean dark aesthetics, and easy long-term maintainability.

---

## ✨ Features

### 🎨 UI & Animations
- Near-black dark theme with per-game accent colours (blue · green · amber · purple)
- Spotlight card hover effect — radial gradient tracks the mouse cursor
- Staggered `slideInBlur` entrance animations on the hero section
- Grid background texture with subtle opacity
- Glassmorphism-style header that transitions on scroll

### 🕹 Games
| Game | Highlights |
|---|---|
| **Tic Tac Toe** | Two-player, win detection, persistent score across rounds |
| **Snake** | Canvas-rendered, WASD + arrow key support, speed scales with score, pause/resume |
| **Whack A Mole** | 30-second countdown, random mole spawning, hit animation |
| **Memory Cards** | Three difficulty levels (Easy · Medium · Hard), 3D card flip, best score tracking |

### 💾 Persistent Scores
- High scores and best move counts saved to `localStorage`
- Scores persist across page refreshes per game
- Reset buttons available in each game UI

### 📱 Responsive Layout
- Two-column game card grid collapses to single column on mobile
- Fixed header with mobile menu button
- All game boards scale within their containers

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3 + CSS custom properties + keyframes |
| **Icons** | Heroicons v2 (`@heroicons/react`) |
| **Canvas** | Native HTML5 Canvas API (Snake game) |
| **Storage** | Browser `localStorage` (scores + best times) |
| **Deployment** | Vercel |

---

## 🏗 Project Structure

```
Game Zone/
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── not-found.tsx
    │   ├── homepage/
    │   │   ├── page.tsx
    │   │   └── components/
    │   │       ├── HeroSection.tsx
    │   │       └── GameGrid.tsx
    │   ├── tic-tac-toe/
    │   │   ├── page.tsx
    │   │   └── components/
    │   │       ├── TicTacToeGame.tsx
    │   │       ├── GameBoard.tsx
    │   │       ├── GameControls.tsx
    │   │       └── GameStats.tsx
    │   ├── snake-game/
    │   │   ├── page.tsx
    │   │   └── components/
    │   │       ├── SnakeGame.tsx
    │   │       ├── GameCanvas.tsx
    │   │       ├── GameControls.tsx
    │   │       └── GameStats.tsx
    │   ├── memory-cards/
    │   │   ├── page.tsx
    │   │   └── components/
    │   │       ├── MemoryCardGame.tsx
    │   │       ├── GameBoard.tsx
    │   │       ├── GameControls.tsx
    │   │       └── GameStats.tsx
    │   └── whack-a-mole/
    │       ├── page.tsx
    │       └── components/
    │           ├── WhackAMoleGame.tsx
    │           ├── GameBoard.tsx
    │           ├── GameControls.tsx
    │           └── GameStats.tsx
    ├── components/
    │   ├── common/
    │   │   ├── Header.tsx
    │   │   └── Footer.tsx
    │   └── ui/
    │       ├── AppIcon.tsx
    │       └── AppImage.tsx
    └── styles/
        ├── index.css
        └── tailwind.css
```

---

## 🚀 Running Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/chaarzone.git
cd chaarzone
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the dev server

```bash
npm run dev
```

Open [http://localhost:4028](http://localhost:4028) in your browser.

---

## 🎮 Adding a Game

The per-route pattern makes adding a new game straightforward.

### 1. Create the route folder

```
src/app/<your-game>/
├── page.tsx
└── components/
    ├── YourGame.tsx       # State orchestrator
    ├── GameBoard.tsx      # Board / canvas
    ├── GameControls.tsx   # Buttons + instructions
    └── GameStats.tsx      # Score display
```

### 2. Add the page

```tsx
// src/app/<your-game>/page.tsx
import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import YourGame from './components/YourGame';

export const metadata: Metadata = {
  title: 'Your Game - Game Hub',
  description: 'Short description of your game.',
};

export default function YourGamePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>
      <main className="pt-32 pb-20 px-6">
        <YourGame />
      </main>
      <Footer />
    </div>
  );
}
```

### 3. Register it in the nav and game grid

```ts
// src/components/common/Header.tsx — add to navLinks
{ id: 'nav_yourgame', label: 'Your Game', href: '/your-game' }

// src/app/homepage/components/GameGrid.tsx — add to games array
{
  id: 'game_yourgame',
  title: 'Your Game',
  description: 'One-line description.',
  icon: 'SomeHeroIcon',
  color: 'from-pink-500 to-pink-600',
  href: '/your-game',
  difficulty: 'Easy',
}
```

---

## 🌐 Deployment

The project is deployed on **Vercel** with automatic redeployment on every push to `main`.

### Deploy your own fork

1. Fork this repo
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your fork
3. Vercel auto-detects Next.js — no configuration needed
4. Click **Deploy**

### Pushing updates

```bash
git add .
git commit -m "describe your change"
git push
```

Vercel redeploys automatically in ~60 seconds. ✅

---

## 🎬 Demo

<p align="center">
  <a href="https://youtu.be/ftJkrfolUF8?si=rqWmqWwBOwEH1nbw">
    <img src="https://img.youtube.com/vi/ftJkrfolUF8/maxresdefault.jpg" width="800">
  </a>
</p>

---

## ⚠️ Known Limitations

- **No multiplayer** — all games are local only (same device, same browser tab)
- **Scores are device-local** — `localStorage` does not sync across browsers or devices
- **Snake canvas** — not touch-controlled; keyboard only on mobile is impractical

## 🔮 Future Improvements

- 📱 **Touch/swipe controls** for Snake on mobile
- 🌐 **Global leaderboard** via a lightweight backend (e.g. Supabase)
- 🤖 **AI opponent** for Tic Tac Toe (minimax)
- 🌙 **Light mode** toggle
- 🔊 **Sound effects** per game

---

## 👨‍💻 Author

Ria Chadha

---

