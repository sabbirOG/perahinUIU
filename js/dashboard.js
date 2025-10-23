'use strict';

/**
 * DASHBOARD.JS - Dashboard-specific interactions
 */

(function() {
    // Animate quick links
    document.querySelectorAll('.quick-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
    
    // Course title click navigation
    document.querySelectorAll('.card h3').forEach(title => {
        title.style.cursor = 'pointer';
        title.addEventListener('click', () => {
            window.location.href = 'pages/courses.html';
        });
    });
})();
