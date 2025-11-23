# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Netlify (Easiest - Drag & Drop)
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `/dist` folder to Netlify
4. Done! Your site is live

### Option 2: Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Deploy!

### Option 3: Cloudflare Pages
1. Push code to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect your repository
4. Build command: `npm run build`
5. Build output: `dist`
6. Deploy!

### Option 4: GitHub Pages
```bash
# Build the project
npm run build

# Create gh-pages branch
git checkout -b gh-pages

# Copy dist contents to root
cp -r dist/* .

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

Then enable GitHub Pages in your repo settings, select `gh-pages` branch.

## 🔍 Pre-Deployment Checklist

- [ ] Update meta tags in HTML files (title, description, URL)
- [ ] Replace placeholder links (GitHub, LinkedIn, Twitter)
- [ ] Test all pages locally with `npm run preview`
- [ ] Check mobile responsiveness
- [ ] Verify all animations work
- [ ] Test contact form (if added)
- [ ] Add Google Analytics (optional)
- [ ] Set up custom domain (optional)

## 🌐 Custom Domain Setup

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records at your registrar:
   ```
   Type: CNAME
   Name: www
   Value: [your-site].netlify.app
   ```

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

## 📊 Performance Tips

After deployment:
1. Test with [PageSpeed Insights](https://pagespeed.web.dev/)
2. Check SEO with [Google Search Console](https://search.google.com/search-console)
3. Monitor with [Google Analytics](https://analytics.google.com/)

## 🔐 Security Notes

The built files in `/dist` are:
- ✅ Minified (reduced file size)
- ✅ Obfuscated (variable names scrambled)
- ✅ Hashed (filenames randomized)
- ✅ Protected (right-click disabled, dev tools blocked)

**Note:** While this makes copying difficult, determined developers can still view the code. For maximum protection, consider server-side rendering or WebAssembly for critical logic.
