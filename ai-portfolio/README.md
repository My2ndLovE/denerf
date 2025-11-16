# 🤖 AI Portfolio Website

A stunning, modern portfolio website built with Next.js 14, Three.js, and GSAP. Features immersive 3D animations, smooth transitions, and a neural network theme perfect for showcasing AI/ML expertise.

## ✨ Features

### 🎨 Design & UX
- **Neural Network Hero** - Interactive 3D particle system with mouse tracking
- **Smooth Scrolling** - Buttery-smooth scroll experience with Lenis
- **Custom Cursor** - AI-themed cursor with hover states
- **3D Visualizations** - Orbital skills system and interactive elements
- **Loading Animation** - AI training progress simulation
- **Responsive Design** - Fully optimized for all devices

### 🚀 Sections
1. **Hero** - 3D neural network background with animated text
2. **About** - Animated stats with count-up effects
3. **Skills** - 3D orbital visualization of tech stack
4. **Portfolio** - 3D tilt cards showcasing projects
5. **Experience** - Vertical timeline with achievements
6. **Testimonials** - Animated carousel with client reviews
7. **Contact** - Interactive form with validation

### 🛠️ Tech Stack

**Core:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

**3D & Animation:**
- Three.js - 3D graphics engine
- @react-three/fiber - React renderer for Three.js
- @react-three/drei - Useful helpers for R3F
- GSAP - Professional-grade animation
- Framer Motion - React animations
- Lenis - Smooth scrolling

**UI/UX:**
- Lucide React - Icon system
- Custom components - Fully customizable

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Navigate to project directory
cd ai-portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 🎨 Customization

### Update Site Information

Edit `src/lib/constants.ts`:

```typescript
export const SITE_CONFIG = {
  name: 'Your Name',
  title: 'AI Engineer & ML Specialist',
  description: 'Your description',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
}
```

### Add Your Projects

Update the `PROJECTS` array in `src/lib/constants.ts`:

```typescript
export const PROJECTS = [
  {
    id: 1,
    title: 'Your Project',
    description: 'Project description',
    image: '/projects/project1.jpg',
    tags: ['Python', 'TensorFlow', 'React'],
    link: 'https://github.com/yourusername/project',
    featured: true,
  },
  // Add more projects...
]
```

### Customize Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  cyber: {
    cyan: '#00F0FF',    // Change primary color
    purple: '#9D00FF',  // Change secondary color
    pink: '#FF006B',    // Change accent color
    dark: '#0A0E1A',    // Change dark background
    darker: '#050711',  // Change darker background
  },
}
```

### Update Skills

Edit the `SKILLS` array in `src/lib/constants.ts`:

```typescript
export const SKILLS = [
  { name: 'Python', level: 95, category: 'language' },
  { name: 'TensorFlow', level: 90, category: 'framework' },
  // Add your skills...
]
```

## 📁 Project Structure

```
ai-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── CustomCursor.tsx    # Custom cursor
│   │   │   ├── SmoothScroll.tsx    # Smooth scroll
│   │   │   ├── Navigation.tsx      # Nav bar
│   │   │   └── LoadingScreen.tsx   # Loading screen
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Hero section
│   │   │   ├── About.tsx           # About section
│   │   │   ├── Skills.tsx          # Skills section
│   │   │   ├── Portfolio.tsx       # Portfolio section
│   │   │   ├── Timeline.tsx        # Timeline section
│   │   │   ├── Testimonials.tsx    # Testimonials
│   │   │   └── Contact.tsx         # Contact form
│   │   ├── 3d/
│   │   │   ├── NeuralNetwork.tsx   # Neural net viz
│   │   │   └── OrbitalSkills.tsx   # Orbital skills
│   │   └── ui/
│   │       └── Card3D.tsx          # 3D tilt card
│   ├── hooks/
│   │   ├── useCursor.ts            # Cursor hook
│   │   └── useMediaQuery.ts        # Responsive hook
│   ├── lib/
│   │   ├── utils.ts                # Utility functions
│   │   └── constants.ts            # Site configuration
└── public/                         # Static assets
```

## 🎯 Performance Optimization

### Implemented Optimizations:
- Code splitting with Next.js dynamic imports
- Lazy loading for Three.js scenes
- Optimized animations with `will-change` hints
- Responsive images and assets
- Reduced bundle size with tree-shaking
- Hardware-accelerated CSS transforms

### Performance Tips:
- Use WebP/AVIF images for better compression
- Implement image optimization with next/image
- Monitor bundle size with `npm run build`
- Test on mobile devices regularly
- Use Lighthouse for performance audits

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo to Vercel dashboard
```

### Deploy to Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Environment Variables

For production, consider adding:
- `NEXT_PUBLIC_ANALYTICS_ID` - Analytics tracking
- `NEXT_PUBLIC_SITE_URL` - Your site URL
- Email service credentials for contact form

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Your Name - your.email@example.com

Project Link: https://github.com/yourusername/ai-portfolio

---

**Built with ❤️ using Next.js, Three.js, and GSAP**

*Star ⭐ this repo if you find it helpful!*
