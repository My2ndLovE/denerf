# Denerf Studio - Professional Portfolio

A premium, SEO-optimized portfolio website with code protection and modern build process.

## 🚀 Features

- ✅ **SEO-Optimized**: Static HTML with proper meta tags, semantic structure
- 🔒 **Code Protection**: Minification, obfuscation, and anti-copy measures
- 🎨 **Modern Design**: Three.js animations, GSAP scroll effects, glassmorphism
- 📦 **Modular Architecture**: Separated CSS, JS modules for maintainability
- ⚡ **Fast Performance**: Optimized builds with Vite
- 📱 **Fully Responsive**: Mobile-first design approach

## 📁 Project Structure

```
denerf-pro/
├── src/
│   ├── index.html          # Home page
│   ├── work.html           # Portfolio/Work page
│   ├── services.html       # Services page
│   ├── styles/
│   │   └── main.css        # Global styles
│   └── scripts/
│       ├── security.js     # Anti-copy protection
│       ├── animations.js   # Three.js background
│       └── page-animations.js  # GSAP page transitions
├── public/                 # Static assets
├── dist/                   # Production build (generated)
├── package.json
└── vite.config.js
```

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Outputs to `/dist` folder with:
- Minified HTML/CSS/JS
- Obfuscated variable names
- Hashed file names
- Removed console logs

### Preview Production Build
```bash
npm run preview
```

## 🔐 Security Features

1. **Right-click disabled**
2. **Dev tools shortcuts blocked** (F12, Ctrl+Shift+I, etc.)
3. **Console warning** for code theft attempts
4. **Minified & obfuscated** JavaScript
5. **Hashed file names** to prevent direct access

## 🌐 SEO Best Practices

- ✅ Semantic HTML5 structure
- ✅ Proper heading hierarchy (H1, H2, H3)
- ✅ Meta descriptions on all pages
- ✅ Open Graph tags for social sharing
- ✅ Fast load times (<2s)
- ✅ Mobile-responsive
- ✅ Accessible navigation

## 📦 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `/dist` folder to:
   - **Netlify**: Drag & drop `/dist`
   - **Vercel**: Import project, set build command to `npm run build`
   - **GitHub Pages**: Push `/dist` to `gh-pages` branch
   - **Cloudflare Pages**: Connect repo, build command `npm run build`

## 🎨 Customization

### Colors
Edit `src/styles/main.css` for global color scheme.

### Content
- **Home**: `src/index.html`
- **Work**: `src/work.html`
- **Services**: `src/services.html`

### Animations
- **Three.js**: `src/scripts/animations.js`
- **GSAP**: `src/scripts/page-animations.js`

## 📄 License

© 2024 Denerf Studio. All Rights Reserved.
