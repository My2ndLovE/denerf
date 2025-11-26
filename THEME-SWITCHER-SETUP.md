# Color Theme Switcher - Setup Instructions

## Files Created:
1. `src/styles/color-themes.css` - Color theme definitions
2. `src/styles/theme-switcher-ui.css` - Switcher UI styles
3. `src/scripts/color-theme-switcher.js` - Switcher logic

## To Activate:

### Step 1: Add CSS Files to HTML
Add these lines in the `<head>` section of your HTML files (after existing stylesheets):

```html
<link rel="stylesheet" href="./styles/color-themes.css">
<link rel="stylesheet" href="./styles/theme-switcher-ui.css">
```

### Step 2: Add JavaScript
Add this line at the END of your `<body>` section (before closing `</body>` tag):

```html
<script src="./scripts/color-theme-switcher.js"></script>
```

### Step 3: Update Hero Gradient (Optional)
To make the "Alchemy" text use the theme colors, change this line:

**From:**
```html
<span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Alchemy</span>
```

**To:**
```html
<span class="hero-gradient">Alchemy</span>
```

## How to Use:

1. Open your website
2. Look for the floating palette button (bottom-right corner)
3. Click it to open the theme selector
4. Click any theme to test it
5. Your choice is saved automatically!

## Available Themes:

1. **Electric Amber** (Default) - Warm orange/amber with blue accents
2. **Emerald Surge** - Fresh green/teal colors
3. **Crimson Code** - Bold red/pink combination
4. **Violet Velocity** - Premium purple/magenta
5. **Current** - Your existing cyan/purple theme

## Files to Update:

- `src/index.html`
- `src/about.html`
- `src/services.html`
- `src/work.html`

Add the CSS and JS references to all pages for consistent theming!
