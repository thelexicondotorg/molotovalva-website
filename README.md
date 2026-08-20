# MOLOTOVALVA Website

A lightweight Vite + Tailwind CSS project integrated with GSAP (GreenSock) and Lenis Smooth Scroll.

## Tech Stack
- **Vite**: Ultra-fast frontend build tool and dev server
- **Tailwind CSS v4**: Modern, zero-config utility-first CSS framework
- **GSAP + ScrollTrigger**: High-performance animation engine and scroll trigger plugin
- **Lenis**: Smooth scrolling engine synchronized to GSAP's Ticker

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## Structure
```
├── index.html          # Semantic HTML layout (Header, Hero, About, Projects, Services, Contact, Footer)
├── src/
│   ├── main.js         # GSAP & Lenis initialization and scroll synchronization
│   └── styles/
│       └── main.css    # Tailwind CSS imports & Lenis base rules
├── package.json
└── vite.config.js
```
