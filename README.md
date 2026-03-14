# MIMIS.DEV — 3D Interactive Portfolio

> A futuristic developer portfolio built with **Next.js 14**, **React Three Fiber**, **Three.js**, **Drei**, **Zustand**, **Framer Motion** and **Tailwind CSS**.

---

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/yassinemimis/portflio-3d.git
cd portflio-3d

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## 📦 Dependencies

```bash
npm install \
  @react-three/fiber \
  @react-three/drei \
  three \
  zustand \
  framer-motion \
  clsx

npm install -D \
  @types/three \
  typescript \
  tailwindcss \
  postcss \
  autoprefixer
```

---

## 📁 Folder Structure

```
mimis-3d/
├── app/
│   ├── layout.tsx               ← Root layout + fonts + metadata
│   └── page.tsx                 ← Assembles Canvas + all UI layers
│
├── components/
│   ├── scene/
│   │   ├── MainScene.tsx        ← <Canvas> root with fog + Suspense
│   │   ├── CameraRig.tsx        ← Lerp camera transitions + OrbitControls
│   │   ├── Lighting.tsx         ← 3 animated point lights (cyan/magenta/blue)
│   │   ├── Particles.tsx        ← 1600 dual-color drifting particles
│   │   ├── Grid.tsx             ← Double-layered floor grid
│   │   └── MouseEnergy.tsx      ← Mouse → particle attraction + ripple rings
│   │
│   ├── objects/
│   │   ├── HeroObject.tsx       ← Nuclear plasma sphere (core + rings + debris)
│   │   ├── SectionOrb.tsx       ← 5 Crystal Shards + Nebula Spheres nav orbs
│   │   └── ProjectPanel.tsx     ← Floating HTML-in-3D project cards
│   │
│   └── ui/
│       ├── Loader.tsx           ← Animated progress loader
│       ├── HUD.tsx              ← Top nav + section badge + bottom bar
│       ├── HeroText.tsx         ← Centered name / role overlay
│       ├── SectionOverlay.tsx   ← Sliding right panel (About/Skills/Experience/Contact)
│       ├── ProjectsOverlay.tsx  ← Full-screen 3D CSS carousel (scroll velocity)
│       └── CustomCursor.tsx     ← Neon dot + lagging halo cursor
│
├── hooks/
│   └── useSection.ts            ← Zustand global section state
│
├── data/
│   └── portfolio.ts             ← All content + ORB_CONFIG + CAM_PRESETS
│
└── styles/
    └── globals.css              ← Tailwind + CSS variables + animations
```

---

## 🎮 Features

| Feature | Description |
|---|---|
| **Loader** | Animated progress bar with stage messages |
| **Plasma Hero** | Nuclear plasma sphere — distorted core, orbit rings, energy bursts, debris |
| **Nebula Orbs** | 5 interactive Crystal Shards + Nebula Spheres — each flies camera to its section |
| **Mouse Energy** | Particles attracted to mouse + ripple rings emitted from cursor |
| **Custom Cursor** | Neon cyan dot with lagging halo |
| **Particle Field** | 1600 cyan/magenta points drifting in world space |
| **Camera Rig** | Smooth lerp transitions between section presets + OrbitControls |
| **Projects Carousel** | Full-screen 3D CSS horizontal carousel — scroll to accelerate, drag to navigate |
| **Side Panel** | Slides in from right — About / Skills (animated bars) / Experience (timeline) / Contact |
| **HUD** | Fixed nav bar + active section badge + status bar |
| **Fog** | Exponential fog for depth |

---

## ✏️ Customising Content

Edit **`data/portfolio.ts`** to update:

- **Personal info** — name, role, tagline, about text
- **Skills** — name, level %, color
- **Projects** — title, description, tech stack, link, 3D position
- **Experience** — company, position, period, type, location, achievements, technologies
- **Contact** — email, GitHub, LinkedIn, portfolio
- **Orb positions** — `ORB_CONFIG` array
- **Camera presets** — `CAM_PRESETS` per section

---

## 🧭 Sections

| Section | Orb Color | Content |
|---|---|---|
| **About** | `#00FFD1` cyan | Bio + current stack tags |
| **Skills** | `#61DAFB` blue | Animated skill bars |
| **Experience** | `#A78BFA` purple | Timeline with 5 internships/jobs |
| **Projects** | `#FF6B6B` red | Full-screen scroll carousel |
| **Contact** | `#FFD43B` yellow | Links — email, GitHub, LinkedIn |

---

## 🌐 Deploy on Vercel

```bash
npm run build
vercel deploy
```

No special configuration needed — `next.config.js` handles Three.js/canvas setup automatically.

---

## ⚙️ next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: "loose" },
  webpack: (config) => {
    config.externals.push({ canvas: "commonjs canvas" });
    return config;
  },
};
module.exports = nextConfig;
```

> ⚠️ Must be `.js` not `.ts` — older Next.js versions don't support `next.config.ts`

---

## 🛠️ Tech Stack

| Library | Role |
|---|---|
| **Next.js 14** | App Router framework |
| **React Three Fiber** | React renderer for Three.js |
| **@react-three/drei** | Helpers — MeshDistortMaterial, Html, Sparkles, AdaptiveDpr… |
| **Three.js** | 3D engine |
| **Zustand** | Global section state |
| **Framer Motion** | Projects carousel — scroll velocity, spring physics |
| **Tailwind CSS** | Utility styling |
| **Orbitron + Share Tech Mono** | Google Fonts |