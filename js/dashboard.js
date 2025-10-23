// Dashboard-specific functionality
(function() {
    // Add any dashboard-specific interactions here
    // For example, quick link animations, notification interactions, etc.
    
    // Animate quick links on hover
    document.querySelectorAll('.quick-link').forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click handlers for course preview cards
    document.querySelectorAll('.card h3').forEach(function(courseTitle) {
        courseTitle.style.cursor = 'pointer';
        courseTitle.addEventListener('click', function() {
            window.location.href = 'pages/courses.html';
        });
    });
})();
