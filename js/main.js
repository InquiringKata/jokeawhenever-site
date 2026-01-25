/**
 * JokeForge - Main JavaScript
 */

// Theme Toggle (Dark Mode)
(function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const themeIcon = toggle?.querySelector('.theme-icon');

    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }

    // Toggle handler
    if (toggle) {
        toggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            if (themeIcon) {
                themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            }
        });
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            if (themeIcon) {
                themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            }
        }
    });
})();

// Copy Link Button
document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.share-copy');

    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const url = button.dataset.url || window.location.href;

            try {
                await navigator.clipboard.writeText(url);
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.background = '#10b981';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                button.textContent = 'Failed';

                setTimeout(() => {
                    button.textContent = 'Copy Link';
                }, 2000);
            }
        });
    });
});

// Mobile Navigation Toggle (if needed in future)
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded',
                navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
