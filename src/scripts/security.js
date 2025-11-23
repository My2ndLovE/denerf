/**
 * Security & Anti-Copy Protection
 * Disables right-click, dev tools shortcuts, and displays console warning
 */

// Disable Right Click
document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
    // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    if (
        event.keyCode === 123 ||
        ctrlShiftKey(e, 'I') ||
        ctrlShiftKey(e, 'J') ||
        ctrlShiftKey(e, 'C') ||
        (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
    )
        return false;
};

// Console Warning
console.log(
    "%cSTOP!",
    "color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 0px black;"
);
console.log(
    "%cThe source code of this website is proprietary and protected by copyright laws. Any attempt to copy, reverse engineer, or distribute this code is strictly prohibited.",
    "color: white; font-size: 16px; background: #222; padding: 10px; border-radius: 5px;"
);
