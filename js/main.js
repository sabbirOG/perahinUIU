/**
 * MAIN.JS - Global JavaScript functionality
 * 
 * This file contains shared functionality used across all pages:
 * - Mobile hamburger menu toggle
 * - Back button visibility and behavior
 * - Footer year update
 * - Click-outside-to-close menu behavior
 * - Theme toggling (dark/light mode)
 */

(function(){
    // ===== ELEMENT REFERENCES =====
    var hamburger = document.getElementById('hamburger');      // Mobile menu toggle button
    var navMenu = document.getElementById('navMenu');          // Navigation menu container
    var backButton = document.getElementById('backButton');    // Mobile back button
    var yearSpan = document.getElementById('year');            // Footer year display

    // ===== THEME MANAGEMENT =====
    // Theme toggle functionality
    function setupThemeToggle() {
        // Create theme toggle button
        var themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        themeToggle.innerHTML = `
            <svg class="theme-icon-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg class="theme-icon-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <span class="theme-text">Light</span>
        `;

        // Insert before hamburger menu
        hamburger.parentNode.insertBefore(themeToggle, hamburger);

        // Load saved theme preference
        var savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggle(savedTheme === 'dark');

        // Theme toggle click handler
        themeToggle.addEventListener('click', function() {
            var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            var newTheme = isDark ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggle(!isDark);
        });
    }

    function updateThemeToggle(isDark) {
        var lightIcon = document.querySelector('.theme-icon-light');
        var darkIcon = document.querySelector('.theme-icon-dark');
        var themeText = document.querySelector('.theme-text');

        if (isDark) {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'inline';
            themeText.textContent = 'Dark';
        } else {
            lightIcon.style.display = 'inline';
            darkIcon.style.display = 'none';
            themeText.textContent = 'Light';
        }
    }

    // ===== FOOTER YEAR UPDATE =====
    // Automatically update copyright year in footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ===== MOBILE HAMBURGER MENU =====
    // Toggle mobile navigation menu when hamburger is clicked
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(){
            navMenu.classList.toggle('open');  // Show/hide mobile menu
        });
        
        // Close mobile menu when clicking outside of it
        document.addEventListener('click', function(e){
            var isMenu = navMenu.contains(e.target);        // Click inside menu
            var isHamburger = hamburger.contains(e.target); // Click on hamburger
            if (!isMenu && !isHamburger) {
                navMenu.classList.remove('open');  // Close menu
            }
        });
    }

    // ===== MOBILE BACK BUTTON =====
    // Show/hide back button based on current page
    if (backButton) {
        // Hide back button on landing page (index.html or root)
        var isIndex = /index\.html$/.test(location.pathname) || 
                     /\/perahin-uiu\/?$/.test(location.pathname) || 
                     location.pathname === '/perahin-uiu/' || 
                     location.pathname === '/perahin-uiu' || 
                     location.pathname.endsWith('/perahin-uiu') ||
                     location.pathname.endsWith('/perahin-uiu/');
        backButton.style.visibility = isIndex ? 'hidden' : 'visible';
        
        // Go back in browser history when clicked
        backButton.addEventListener('click', function(){ 
            history.back(); 
        });
    }

    // Initialize theme toggle
    setupThemeToggle();
})();


