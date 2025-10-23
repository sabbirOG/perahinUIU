'use strict';

/**
 * MAIN.JS - Global functionality for all pages
 * Features: Theme toggle, mobile menu, back button, footer year
 */

(function() {
    // ========== DOM REFERENCES ==========
    const DOM = {
        hamburger: document.getElementById('hamburger'),
        navMenu: document.getElementById('navMenu'),
        backButton: document.getElementById('backButton'),
        yearSpan: document.getElementById('year')
    };

    // ========== THEME MANAGEMENT ==========
    const Theme = {
        icons: {
            light: `<svg class="theme-icon-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>`,
            dark: `<svg class="theme-icon-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>`
        },

        init() {
            const toggle = document.createElement('button');
            toggle.className = 'theme-toggle';
            toggle.setAttribute('aria-label', 'Toggle theme');
            toggle.innerHTML = `${this.icons.light}${this.icons.dark}<span class="theme-text">Light</span>`;
            
            DOM.hamburger.parentNode.insertBefore(toggle, DOM.hamburger);
            
            const saved = localStorage.getItem('theme') || 'light';
            this.set(saved);
            
            toggle.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                this.set(current === 'dark' ? 'light' : 'dark');
            });
        },

        set(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            const isDark = theme === 'dark';
            const lightIcon = document.querySelector('.theme-icon-light');
            const darkIcon = document.querySelector('.theme-icon-dark');
            const text = document.querySelector('.theme-text');
            
            if (lightIcon && darkIcon && text) {
                lightIcon.style.display = isDark ? 'none' : 'inline';
                darkIcon.style.display = isDark ? 'inline' : 'none';
                text.textContent = isDark ? 'Dark' : 'Light';
            }
        }
    };

    // ========== MOBILE MENU ==========
    if (DOM.hamburger && DOM.navMenu) {
        DOM.hamburger.addEventListener('click', () => {
            DOM.navMenu.classList.toggle('open');
        });
        
        document.addEventListener('click', (e) => {
            const clickedOutside = !DOM.navMenu.contains(e.target) && 
                                  !DOM.hamburger.contains(e.target);
            if (clickedOutside) DOM.navMenu.classList.remove('open');
        });
    }

    // ========== BACK BUTTON ==========
    if (DOM.backButton) {
        const isIndexPage = () => {
            const path = location.pathname;
            return /index\.html$/.test(path) || 
                   /\/perahin-uiu\/?$/.test(path) ||
                   path.endsWith('/perahin-uiu');
        };
        
        DOM.backButton.style.visibility = isIndexPage() ? 'hidden' : 'visible';
        DOM.backButton.addEventListener('click', () => history.back());
    }

    // ========== FOOTER YEAR ==========
    if (DOM.yearSpan) {
        DOM.yearSpan.textContent = new Date().getFullYear();
    }

    // ========== INITIALIZE ==========
    Theme.init();
})();


