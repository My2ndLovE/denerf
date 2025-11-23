# SEO-Friendly Clean URLs for Cloudflare Pages

## Overview
This guide explains how to deploy your site to Cloudflare Pages with clean URLs (without `.html` extensions).

## How It Works

Cloudflare Pages **automatically** serves HTML files without extensions! 

### Example:
- File: `about.html` → URL: `yoursite.com/about`
- File: `work.html` → URL: `yoursite.com/work`  
- File: `services.html` → URL: `yoursite.com/services`

## What You Need to Do

### 1. **Update Internal Links** (IMPORTANT)

Change all your navigation links from `.html` to clean URLs:

**❌ Old (with .html):**
```html
<a href="about.html">ABOUT</a>
<a href="work.html">WORK</a>
<a href="services.html">SERVICES</a>
```

**✅ New (clean URLs):**
```html
<a href="/about">ABOUT</a>
<a href="/work">WORK</a>
<a href="/services">SERVICES</a>
```

### 2. **Files to Update**

Update navigation links in these files:
- `src/index.html`
- `src/about.html`
- `src/work.html`
- `src/services.html`

### 3. **Redirects File** (Optional but Recommended)

The `public/_redirects` file has been created to handle:
- Redirecting `.html` URLs to clean URLs
- Handling trailing slashes

```
/index.html / 301
/about.html /about 301
/work.html /work 301
/services.html /services 301
```

## Deployment Steps

### 1. **Build Your Site**
```bash
npm run build
```

### 2. **Deploy to Cloudflare Pages**

**Option A: Via Cloudflare Dashboard**
1. Go to Cloudflare Pages
2. Create new project
3. Connect your GitHub repo
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Deploy!

**Option B: Via Wrangler CLI**
```bash
npx wrangler pages deploy dist
```

## Testing Locally

To test clean URLs locally before deploying:

```bash
npm run build
npx serve dist
```

Then visit:
- `http://localhost:3000/` (home)
- `http://localhost:3000/about` (about page)
- `http://localhost:3000/work` (work page)

## SEO Benefits

✅ **Clean URLs** - Better for users and search engines  
✅ **301 Redirects** - Preserve SEO if old `.html` URLs are indexed  
✅ **Consistent** - All pages follow the same pattern  
✅ **Professional** - Modern web standard

## Important Notes

1. **Keep `.html` extensions in your source files** - Don't rename them
2. **Update only the links** - Change `href` attributes to clean URLs
3. **Cloudflare handles the rest** - No server configuration needed
4. **Works automatically** - No additional setup required on Cloudflare Pages

## Example Navigation (Final)

```html
<nav>
    <a href="/">Home</a>
    <a href="/work">Work</a>
    <a href="/services">Services</a>
    <a href="/about">About</a>
    <a href="/#contact">Contact</a>
</nav>
```

## Troubleshooting

**Q: Links don't work locally?**  
A: Use `npx serve dist` instead of opening files directly

**Q: 404 errors on Cloudflare?**  
A: Make sure your build output directory is set to `dist`

**Q: Old .html URLs still showing?**  
A: The `_redirects` file will handle 301 redirects automatically
