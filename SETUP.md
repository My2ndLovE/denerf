# 🚀 Quick Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)

## Installation Options

### Option 1: Install All Concepts

```bash
# From the root directory
npm run install-all
```

### Option 2: Install Individual Concept

```bash
# Navigate to specific concept
cd concept-1-digital-forge  # or any other concept
npm install
```

## Running the Projects

### Run Individual Concept

```bash
cd concept-1-digital-forge
npm run dev
```

Visit the respective ports:
- **Concept 1** - Digital Forge: http://localhost:3001
- **Concept 2** - Neural Nexus: http://localhost:3002
- **Concept 3** - Code Matrix: http://localhost:3003
- **Concept 4** - Builder's Playground: http://localhost:3004
- **Concept 5** - Liquid Interface: http://localhost:3005
- **Concept 6** - Terminal Reimagined: http://localhost:3006

### Run All Concepts Simultaneously

You'll need to open 6 terminal windows:

```bash
# Terminal 1
cd concept-1-digital-forge && npm run dev

# Terminal 2
cd concept-2-neural-network && npm run dev

# Terminal 3
cd concept-3-code-matrix && npm run dev

# Terminal 4
cd concept-4-builders-playground && npm run dev

# Terminal 5
cd concept-5-liquid-interface && npm run dev

# Terminal 6
cd concept-6-terminal-reimagined && npm run dev
```

## Production Build

```bash
cd concept-X-name
npm run build
npm run start
```

## Troubleshooting

### Port Already in Use

If you get a port error, either:
1. Kill the process using that port
2. Change the port in package.json scripts

### Module Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

### Type Errors

```bash
npm run lint
# Fix any errors shown
```

## Browser Requirements

All concepts require a modern browser with:
- WebGL 2.0 support
- ES6+ JavaScript
- CSS Grid & Flexbox

**Recommended**: Chrome 90+, Firefox 88+, Safari 15+, Edge 90+

## Performance Tips

1. **Disable browser extensions** for best performance
2. **Use hardware acceleration** in browser settings
3. **Close unused tabs** to free up GPU resources
4. For development, use **Chrome DevTools** Performance tab to monitor

## Next Steps

1. Pick your favorite concept
2. Customize colors in `tailwind.config.js`
3. Update content in component files
4. Deploy to Vercel/Netlify

Happy coding! 🎨✨
