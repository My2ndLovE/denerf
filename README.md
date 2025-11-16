# Creative Portfolio Website

A modern, animated portfolio website featuring:

## ✨ Features

- **3D Animated Hero Section** - Three.js particle system with interactive background
- **Scroll-Driven Animations** - GSAP ScrollTrigger for smooth reveals
- **Custom Interactive Cursor** - Context-aware cursor with hover effects
- **Kinetic Typography** - Animated text effects and transitions
- **Smooth Scrolling** - Butter-smooth scroll experience
- **Responsive Design** - Mobile-first approach
- **Glassmorphism & Glow Effects** - Modern UI aesthetics
- **Portfolio Grid** - Interactive project showcase with 3D hover effects

## 🛠️ Tech Stack

- **Three.js** - 3D graphics and WebGL
- **GSAP** - High-performance animations
- **Vanilla JavaScript** - No framework dependencies
- **Modern CSS** - Custom properties, Grid, Flexbox

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── css/
│   ├── style.css       # Main styles
│   └── animations.css  # Animation definitions
├── js/
│   ├── main.js         # Main JavaScript
│   ├── hero-3d.js      # Three.js hero animation
│   ├── scroll.js       # Scroll animations
│   └── cursor.js       # Custom cursor
└── assets/             # Images and resources
```

## 🎨 Customization

Edit the CSS variables in `css/style.css` to customize colors, fonts, and spacing:

```css
:root {
  --primary-color: #00f0ff;
  --secondary-color: #ff00ff;
  --accent-color: #ffff00;
  /* ... */
}
```

## 📝 License

MIT
