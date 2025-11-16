# 🚀 Quick Start Guide

Get your AI portfolio website up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Step 1: Install Dependencies

```bash
cd ai-portfolio
npm install
```

## Step 2: Customize Your Content

Edit `src/lib/constants.ts` to add your personal information:

```typescript
// Update these with your information
export const SITE_CONFIG = {
  name: 'Your Name',
  title: 'AI Engineer & ML Specialist',
  description: 'Your description here',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
}

// Add your skills
export const SKILLS = [
  { name: 'Python', level: 95, category: 'language' },
  // Add more...
]

// Add your projects
export const PROJECTS = [
  {
    id: 1,
    title: 'Your Project Name',
    description: 'Brief description',
    image: '/projects/project1.jpg',
    tags: ['Python', 'TensorFlow'],
    link: 'https://github.com/yourusername/project',
    featured: true,
  },
  // Add more...
]

// Add your experience
export const EXPERIENCE = [
  {
    id: 1,
    role: 'Your Role',
    company: 'Company Name',
    period: '2022 - Present',
    description: 'What you did',
    achievements: [
      'Achievement 1',
      'Achievement 2',
    ],
  },
  // Add more...
]

// Add testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Client Name',
    role: 'Their Role',
    content: 'Their testimonial',
    avatar: '/testimonials/avatar1.jpg',
    rating: 5,
  },
  // Add more...
]
```

## Step 3: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 4: Build for Production

```bash
npm run build
npm start
```

## 🎨 Quick Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  cyber: {
    cyan: '#00F0FF',    // Primary color
    purple: '#9D00FF',  // Secondary color
    pink: '#FF006B',    // Accent color
    dark: '#0A0E1A',    // Dark background
    darker: '#050711',  // Darker background
  },
}
```

### Disable Custom Cursor (Mobile-Friendly)

The custom cursor is automatically disabled on mobile devices. To disable it entirely, remove or comment out `<CustomCursor />` in `src/app/layout.tsx`.

### Disable 3D Effects (Performance)

To disable 3D effects for better performance:

1. In `src/components/sections/Hero.tsx`, remove the `<Canvas>` section
2. In `src/components/sections/Skills.tsx`, remove the `<Canvas>` section

## 📁 Project Structure Overview

```
src/
├── app/
│   ├── layout.tsx          # Root layout (customize here)
│   ├── page.tsx            # Main page (all sections)
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # Layout components
│   ├── sections/           # Page sections
│   ├── 3d/                 # 3D components
│   └── ui/                 # Reusable UI components
└── lib/
    ├── constants.ts        # ⭐ CUSTOMIZE THIS FIRST
    └── utils.ts            # Utility functions
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder

## ⚡ Performance Tips

- Add images to `/public/projects/` and `/public/testimonials/`
- Use WebP format for images
- Keep the number of particles in neural network reasonable (currently 80)
- Test on mobile devices

## 🐛 Common Issues

### Build fails with font error
- Already fixed in this version (using system fonts)

### 3D scenes not showing
- Check browser console for WebGL support
- Try disabling hardware acceleration and re-enabling it

### Slow performance on mobile
- Reduce particle count in `src/components/3d/NeuralNetwork.tsx` (line 25)
- Consider disabling 3D effects on mobile

## 📝 Next Steps

1. ✅ Customize `src/lib/constants.ts` with your data
2. ✅ Add your project images to `/public/projects/`
3. ✅ Test on multiple devices
4. ✅ Deploy to Vercel or Netlify
5. ✅ Share your amazing portfolio!

## 🆘 Need Help?

- Check the full [README.md](./README.md) for detailed documentation
- Review the code comments in each component
- Each section is self-contained and can be customized independently

---

**You're all set!** Start customizing and make this portfolio truly yours! 🎉
