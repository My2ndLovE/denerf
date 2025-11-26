/**
 * Color Theme Switcher
 * Allows testing different color schemes
 */

const COLOR_THEMES = {
    amber: 'Electric Amber',
    emerald: 'Emerald Surge',
    crimson: 'Crimson Code',
    violet: 'Violet Velocity',
    current: 'Current (Cyan/Purple)'
};

// Initialize color theme
function initColorTheme() {
    const savedTheme = localStorage.getItem('denerf-color-theme') || 'amber';
    setColorTheme(savedTheme);
}

// Set color theme
function setColorTheme(theme) {
    document.documentElement.setAttribute('data-color-theme', theme);
    localStorage.setItem('denerf-color-theme', theme);

    // Update active state in switcher
    updateSwitcherUI(theme);
}

// Update switcher UI
function updateSwitcherUI(activeTheme) {
    const buttons = document.querySelectorAll('[data-theme-btn]');
    buttons.forEach(btn => {
        const theme = btn.getAttribute('data-theme-btn');
        if (theme === activeTheme) {
            btn.classList.add('active-theme');
        } else {
            btn.classList.remove('active-theme');
        }
    });
}

// Create theme switcher UI
function createThemeSwitcher() {
    const switcher = document.createElement('div');
    switcher.id = 'color-theme-switcher';
    switcher.innerHTML = `
        <div class="theme-switcher-container">
            <button id="theme-switcher-toggle" class="theme-toggle-btn">
                <i data-lucide="palette" width="20" height="20"></i>
            </button>
            <div id="theme-switcher-panel" class="theme-panel hidden">
                <div class="theme-panel-header">
                    <h3>Color Themes</h3>
                    <p>Test different color schemes</p>
                </div>
                <div class="theme-options">
                    ${Object.entries(COLOR_THEMES).map(([key, name]) => `
                        <button 
                            class="theme-option" 
                            data-theme-btn="${key}"
                            onclick="setColorTheme('${key}')"
                        >
                            <div class="theme-preview theme-preview-${key}"></div>
                            <span>${name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(switcher);

    // Toggle panel
    const toggleBtn = document.getElementById('theme-switcher-toggle');
    const panel = document.getElementById('theme-switcher-panel');

    toggleBtn.addEventListener('click', () => {
        panel.classList.toggle('hidden');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!switcher.contains(e.target)) {
            panel.classList.add('hidden');
        }
    });

    // Initialize Lucide icons for the new button
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initColorTheme();
        createThemeSwitcher();
    });
} else {
    initColorTheme();
    createThemeSwitcher();
}

// Export for use in HTML
window.setColorTheme = setColorTheme;
