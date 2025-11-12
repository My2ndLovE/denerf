# Deployment Guide

## Prerequisites

Before deploying, ensure you have:

1. **Node.js 18+** installed
2. **Cloudflare account** (free tier works!)
3. **GitHub repository** set up
4. **Formspree account** for contact form

---

## Local Development

### 1. Install Dependencies

```bash
npm install
```

**Note**: If you see dependency errors related to missing packages, that's expected since we don't have internet access during initial setup. The `package.json` has all dependencies listed correctly.

### 2. Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 4. Preview Production Build

```bash
npm run preview
```

---

## Deployment to Cloudflare Pages

### Option A: Automatic Deployment (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial deployment"
git push -u origin claude/ai-holographic-avatar-011CV4K5p8ZgcZpNseRZ4wws
```

2. **Connect to Cloudflare Pages**

   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Go to **Pages** → **Create a project**
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Node version**: `18`

3. **Add Environment Variables** (if needed)

   - `PUBLIC_FORMSPREE_ID`: Your Formspree form ID

4. **Deploy!**

   Cloudflare will automatically build and deploy your site. You'll get a URL like:
   `https://ai-holographic-avatar.pages.dev`

### Option B: Manual Deployment via Wrangler CLI

1. **Install Wrangler**

```bash
npm install -g wrangler
```

2. **Login to Cloudflare**

```bash
wrangler login
```

3. **Deploy**

```bash
npm run build
wrangler pages deploy dist --project-name=ai-holographic-avatar
```

---

## Post-Deployment Tasks

### 1. Configure Custom Domain (Optional)

In Cloudflare Pages → Custom domains → Add custom domain

### 2. Setup Formspree Contact Form

1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form
3. Copy the form ID
4. Update `src/components/sections/Contact.astro`:
   - Replace `YOUR_FORM_ID` with your actual Formspree ID
5. Redeploy

### 3. Add Real Project Images

1. Add your project screenshots to `public/images/projects/`
2. Name them according to project IDs:
   - `ai-video-studio.jpg`
   - `wine-vault.jpg`
   - `poker-hub.jpg`
   - `flow-master.jpg`
3. Run optimization script:

```bash
npm run optimize-images
```

4. Commit and push

### 4. Update Content

- **Company info**: Edit `src/data/company.json`
- **Projects**: Edit `src/data/projects.json`
- **Services**: Edit `src/data/services.json`
- **Conversations**: Edit `src/data/conversations.json`

---

## Performance Optimization

### Before Launch Checklist

- [ ] Run Lighthouse audit (target: 85+ mobile, 90+ desktop)
- [ ] Optimize images (WebP format, proper sizes)
- [ ] Test on real mobile devices
- [ ] Test all conversation flows
- [ ] Test contact form submission
- [ ] Check bundle size (`npm run build` - should be < 120KB gzipped)
- [ ] Test accessibility (keyboard navigation, screen readers)
- [ ] Test on different browsers (Chrome, Firefox, Safari)

### Monitoring

After deployment:

- Monitor Core Web Vitals in Cloudflare Analytics
- Check error rates
- Monitor form submissions
- Track user engagement with the AI avatar

---

## Troubleshooting

### Build Fails

- Check Node version (must be 18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run check`

### Images Not Loading

- Ensure images are in `public/images/` folder
- Check file paths in JSON data files
- Verify image URLs start with `/images/`

### Contact Form Not Working

- Verify Formspree form ID is correct
- Check browser console for errors
- Ensure form action URL is correct

### Avatar Not Animating

- Check browser console for errors
- Verify React component loaded: `client:load` directive
- Test on different browsers
- Check if `prefers-reduced-motion` is enabled

---

## GitHub Actions (CI/CD)

The repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. Runs on every push to `main` or `claude/*` branches
2. Installs dependencies
3. Builds the project
4. Deploys to Cloudflare Pages

### Setup Secrets

In GitHub repo → Settings → Secrets and variables → Actions:

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

---

## Need Help?

- **Astro Docs**: https://docs.astro.build
- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages/
- **Formspree Docs**: https://help.formspree.io/

---

Happy deploying! 🚀
