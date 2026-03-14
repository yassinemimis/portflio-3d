# MIMIS.DEV — 3D Interactive Portfolio

> A futuristic developer portfolio built with **Next.js 14**, **React Three Fiber**, **Three.js**, **Drei**, **Zustand** and **Tailwind CSS**.

---

## 🚀 Quick Start

```bash
# 1. Clone or copy this folder into your project
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
  gsap \
  zustand \
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
│   ├── layout.tsx          ← Root layout + font imports + metadata
│   └── page.tsx            ← Assembles Canvas + UI layers
│
├── components/
│   ├── scene/
│   │   ├── MainScene.tsx   ← <Canvas> root with fog, Suspense
│   │   ├── CameraRig.tsx   ← Smooth lerp camera + mouse parallax
│   │   ├── Lighting.tsx    ← Animated point lights
│   │   ├── Particles.tsx   ← Dual-color particle field
│   │   └── Grid.tsx        ← Double-layered floor grid
│   │
│   ├── objects/
│   │   ├── HeroObject.tsx  ← Icosahedron + distorted core + rings
│   │   ├── SectionOrb.tsx  ← 4 interactive floating nav spheres
│   │   └── ProjectPanel.tsx← Floating HTML-in-3D project cards
│   │
│   └── ui/
│       ├── Loader.tsx      ← Animated progress loader
│       ├── HUD.tsx         ← Top nav + section badge + bottom bar
│       ├── HeroText.tsx    ← Centered name / role text
│       └── SectionOverlay.tsx ← Sliding right panel (About/Skills/Contact)
│
├── hooks/
│   └── useSection.ts       ← Zustand global section state
│
├── data/
│   └── portfolio.ts        ← All your content + camera presets
│
└── styles/
    └── globals.css         ← Tailwind + CSS variables + animations
```

---

## 🎮 Features

| Feature | Description |
|---|---|
| **Loader** | Progress bar with stage messages |
| **Hero Object** | Rotating icosahedron wireframe + MeshDistortMaterial core + 2 orbit rings |
| **Particle Field** | 1600 cyan/magenta points drifting in world space |
| **Section Orbs** | 4 glowing interactive spheres — each flies camera to its position |
| **Camera Rig** | Lerp transitions between section presets + idle mouse parallax |
| **Project Panels** | Floating HTML-in-3D cards with tech tags and links |
| **Side Panel** | Slides in from right — About / Skills (animated bars) / Contact |
| **HUD** | Fixed nav bar + section badge + status bar |
| **Fog** | Exponential fog for depth |

---

## ✏️ Customising Content

Edit **`data/portfolio.ts`** to update:
- Your name, role, tagline, about text
- Skill bars (name, level %, color)
- Projects (title, description, tech, link, 3D position)
- Contact links
- Camera presets per section (`CAM_PRESETS`)

---

## 🌐 Deploy on Vercel

```bash
npm run build
vercel deploy
```

No special configuration needed — `next.config.ts` handles the Three.js/canvas setup automatically.

---

## ⚙️ next.config.ts Notes

```ts
const nextConfig = {
  experimental: { esmExternals: "loose" },
  webpack: (config) => {
    config.externals.push({ canvas: "commonjs canvas" });
    return config;
  },
};
```

This is required for Three.js to work correctly with Next.js App Router.

---

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React Three Fiber** — React renderer for Three.js
- **@react-three/drei** — helpers (MeshDistortMaterial, Html, AdaptiveDpr…)
- **Three.js** — 3D engine
- **Zustand** — global section state
- **Tailwind CSS** — utility styling
- **GSAP** — available for advanced animations
- **Orbitron + Share Tech Mono** — Google Fonts
