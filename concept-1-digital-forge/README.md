# 🔥 Digital Forge - Concept 1

> Where code meets craftsmanship. An interactive 3D blacksmith-themed landing page.

## 🎨 Concept Overview

The Digital Forge transforms software development into a blacksmith's workshop. Users interact with a 3D forge environment featuring:

- **Interactive 3D Anvil** - Click to strike and create sparks
- **Animated Hammer** - Floating hammer that strikes on interaction
- **Glowing Furnace** - Flickering fire effects with dynamic lighting
- **Rotating Gears** - Mechanical elements symbolizing engineering
- **Particle Sparks** - Mouse-trail spark effects
- **Smooth Animations** - GSAP-powered scroll animations

## ✨ Key Features

- 🎯 **Fully Interactive 3D Scene** (Three.js + React Three Fiber)
- ⚡ **Bloom & Post-Processing Effects**
- 🔥 **Dynamic Fire & Glow Animations**
- 🎬 **GSAP ScrollTrigger Integration**
- 🎨 **Custom "Forge" Theme** (Fire oranges, molten gold)
- 📱 **Fully Responsive**
- ♿ **Smooth Performance** with lazy loading

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D**: Three.js + React Three Fiber
- **Animation**: GSAP + Framer Motion
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Post-Processing**: @react-three/postprocessing

## 🚀 Installation

```bash
cd concept-1-digital-forge
npm install
npm run dev
```

Visit `http://localhost:3001`

## 📂 Project Structure

```
concept-1-digital-forge/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ForgeScene.tsx        # Main 3D scene
│   ├── HeroSection.tsx
│   ├── Navigation.tsx
│   ├── ProjectsSection.tsx
│   ├── ServicesSection.tsx
│   ├── TeamSection.tsx
│   ├── ContactSection.tsx
│   └── SparksEffect.tsx      # Canvas particle effects
├── package.json
└── README.md
```

## 🎮 Interactions

1. **Click the Anvil** - Creates a "hammer strike" effect
2. **Click the Hammer** - Triggers strike animation
3. **Drag to Rotate** - OrbitControls enabled
4. **Mouse Movement** - Creates spark trail effects
5. **Scroll** - Triggers section animations

## 🎨 Theme Colors

- `forge-fire`: #FF6B35 (Primary fire)
- `forge-ember`: #FFA500 (Ember orange)
- `forge-metal`: #C0C0C0 (Metal silver)
- `forge-glow`: #FFD700 (Golden glow)
- `forge-dark`: #1A1A1A (Dark background)

## 📝 Content Sections

1. **Hero** - Dramatic entrance with forge branding
2. **3D Forge Scene** - Interactive Three.js workshop
3. **Projects** - Showcasing "forged masterpieces"
4. **Services** - "Smithing skills" with tech stack
5. **Team** - "Master smiths" with specialties
6. **Contact** - "Let's forge together" CTA

## 🔧 Customization

Edit `/app/globals.css` to modify the forge theme colors.
Edit `/components/ForgeScene.tsx` to adjust 3D elements.
Modify content in respective section components.

## 🌟 Production Build

```bash
npm run build
npm start
```

---

**Crafted with precision & passion** ⚒️
