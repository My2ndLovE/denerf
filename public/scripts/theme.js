/**
 * Theme management script
 * Handles light/dark mode toggling and persistence
 */

// IMMEDIATE theme application to prevent flash
(function () {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;

    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();

const initTheme = () => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;

    // Apply theme (already applied above, but ensure consistency)
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Update toggle button icon if it exists
    updateThemeIcon(theme);
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    updateThemeIcon(newTheme);
};

const updateThemeIcon = (theme) => {
    const btns = document.querySelectorAll('.theme-toggle-btn');

    btns.forEach(btn => {
        const existingIcon = btn.querySelector('i[data-lucide], svg');

        if (existingIcon) {
            // Try to preserve size
            const width = existingIcon.getAttribute('width') || '20';
            const height = existingIcon.getAttribute('height') || '20';

            const newIcon = document.createElement('i');
            newIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
            newIcon.setAttribute('width', width);
            newIcon.setAttribute('height', height);

            btn.replaceChild(newIcon, existingIcon);
        }
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
};

// Expose to window for button onclick
window.toggleTheme = toggleTheme;

// Init on load
document.addEventListener('DOMContentLoaded', initTheme);
