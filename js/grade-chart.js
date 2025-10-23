'use strict';

/**
 * GRADE-CHART.JS - UIU Grade Chart Widget
 * Features: Collapsible grade reference with letter grades, points, marks, and descriptions
 */

(function() {
    const init = () => {
        const toggle = document.getElementById('gradeChartToggle');
        const content = document.getElementById('gradeChartContent');
        
        if (toggle && content) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                content.classList.toggle('hidden');
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
