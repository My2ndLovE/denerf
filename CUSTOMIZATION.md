# Customization Guide

## 🎨 Quick Customization

### 1. Colors & Branding

Edit `css/style.css` at the top to change your color scheme:

```css
:root {
  /* Change these colors to match your brand */
  --primary-color: #00f0ff;      /* Main accent color */
  --secondary-color: #ff00ff;    /* Secondary accent */
  --accent-color: #ffff00;       /* Additional accent */
  --bg-dark: #0a0a0f;           /* Dark background */
  --bg-darker: #05050a;         /* Darker sections */
}
```

**Popular Color Schemes:**

- **Cyberpunk:** `#00f0ff`, `#ff00ff`, `#ffff00`
- **Sunset:** `#ff6b6b`, `#feca57`, `#ee5a6f`
- **Ocean:** `#0077b6`, `#00b4d8`, `#90e0ef`
- **Forest:** `#2d6a4f`, `#40916c`, `#95d5b2`
- **Monochrome:** `#ffffff`, `#cccccc`, `#888888`

### 2. Typography

Change fonts in `index.html` (Google Fonts section):

```html
<!-- Replace with your preferred fonts -->
<link href="https://fonts.googleapis.com/css2?family=Your+Font+Here&display=swap" rel="stylesheet">
```

Then update in `css/style.css`:

```css
:root {
  --font-primary: 'Your-Font-Name', sans-serif;
  --font-display: 'Your-Display-Font', sans-serif;
}
```

**Recommended Font Pairings:**
- **Modern:** Inter + Space Grotesk
- **Elegant:** Playfair Display + Lato
- **Tech:** JetBrains Mono + IBM Plex Sans
- **Creative:** Syne + DM Sans

### 3. Text Content

**Hero Section** (`index.html` line ~44):
```html
<h1 class="hero-title">
  <span class="word">Your</span>
  <span class="word">Company</span>
  <span class="word gradient-text">Name</span>
</h1>
<p class="hero-subtitle">
  Your compelling tagline goes here
</p>
```

**About Section** (~67):
Update the section to describe your company.

**Services** (~97):
Modify the 4 service cards with your offerings.

**Portfolio Projects** (~139):
Replace placeholder projects with your actual work.

### 4. Contact Information

Update email and social links (`index.html` line ~229):

```html
<a href="mailto:your@email.com" class="contact-link">your@email.com</a>
<div class="social-links">
  <a href="https://twitter.com/yourhandle">Twitter</a>
  <a href="https://instagram.com/yourhandle">Instagram</a>
  <!-- Add/remove as needed -->
</div>
```

### 5. Animation Intensity

**Reduce animations** (for professional clients):

In `js/scroll.js`, change duration values:
```javascript
// From
duration: 1
// To
duration: 0.5  // Faster, more subtle
```

**Increase animations** (for creative showcase):
```javascript
duration: 1.5  // Slower, more dramatic
stagger: 0.3   // More stagger between elements
```

**Disable 3D hero** (for performance):

Remove or comment out in `index.html`:
```html
<!-- <script src="js/hero-3d.js"></script> -->
```

And add a gradient background in CSS instead.

### 6. Adding Your Images

Replace placeholder project images:

1. Add images to `assets/images/` folder
2. Update `index.html` work items:

```html
<div class="placeholder-image" style="background: linear-gradient(...);">
  <!-- Replace with: -->
  <img src="assets/images/project1.jpg" alt="Project Name">
</div>
```

Add this CSS to `css/style.css`:
```css
.work-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 7. Particle Colors

Match 3D particles to your brand (`js/hero-3d.js` line ~54):

```javascript
const color1 = new THREE.Color(0x00f0ff); // Your primary
const color2 = new THREE.Color(0xff00ff); // Your secondary
const color3 = new THREE.Color(0xffff00); // Your accent
```

### 8. Form Integration

Connect contact form to your backend (`js/main.js` line ~130):

Uncomment and update:
```javascript
fetch('https://your-backend.com/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
```

Or use services like:
- **Formspree:** https://formspree.io
- **EmailJS:** https://www.emailjs.com
- **Netlify Forms:** Built-in with Netlify

### 9. SEO & Meta Tags

Update `index.html` head section:

```html
<title>Your Company Name | Creative Portfolio</title>
<meta name="description" content="Your SEO description here">

<!-- Add Open Graph tags -->
<meta property="og:title" content="Your Company Name">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://yoursite.com/preview.jpg">
<meta property="og:url" content="https://yoursite.com">
```

### 10. Logo

Replace text logo with image (`index.html` line ~36):

```html
<a href="#" class="logo">
  <img src="assets/images/logo.svg" alt="Your Company" width="150">
</a>
```

## 🚀 Advanced Customization

### Adding New Sections

1. Add HTML structure
2. Add reveal class: `class="reveal"`
3. GSAP will automatically animate it!

### Changing Layout

- **Services:** 2 columns instead of 4:
  ```css
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  ```

- **Portfolio:** Full width:
  ```css
  .work-grid {
    grid-template-columns: 1fr;
  }
  ```

### Mobile Customization

All `@media (max-width: 768px)` queries are at the bottom of each CSS section.

Adjust breakpoint:
```css
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 480px) { /* Small mobile */ }
```

## 💡 Tips

1. **Test on mobile** - Most visitors will be on phones
2. **Keep it fast** - Don't add too many large images
3. **Accessibility** - Ensure good color contrast
4. **Browser testing** - Check Chrome, Firefox, Safari
5. **Performance** - Run Lighthouse audits

## 🆘 Need Help?

- Check browser console for errors (F12)
- Ensure all script URLs are loading
- Test with `npm run dev` for local development
- Validate HTML/CSS with online validators

Happy customizing! 🎨
