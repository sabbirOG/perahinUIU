// Course Materials Page Script
(function() {
    // Get course info from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseCode = urlParams.get('code');
    const courseTitle = urlParams.get('title');

    // Use centralized materialsData from materialsData.js
    // Make sure to include <script src="js/materialsData.js"></script> before this file in your HTML

    // Update page title and info
    if (courseTitle) {
        document.getElementById('courseTitle').textContent = courseTitle;
        document.getElementById('courseInfo').textContent = 'Access all course materials organized by category';
    }


    // Custom rendering logic: show 'Open here' if link exists, 'idle' if not, 'No materials available' if no links
    if (courseCode && materialsData[courseCode]) {
        const materials = materialsData[courseCode];
        const links = materials.links || {};
        const sections = [
            { key: 'all', listId: 'allMaterialsList', countId: 'allCount', label: 'ALL' },
            { key: 'mid', listId: 'midMaterialsList', countId: 'midCount', label: 'MID' },
            { key: 'final', listId: 'finalMaterialsList', countId: 'finalCount', label: 'FINAL' }
        ];
        let hasAnyLink = false;
        sections.forEach(section => {
            const url = links[section.key];
            const listEl = document.getElementById(section.listId);
            const countEl = document.getElementById(section.countId);
            if (url) {
                hasAnyLink = true;
                countEl.textContent = 'Open folder';
                listEl.innerHTML = `<div class="material-item"><a class="no-underline" href="${url}" target="_blank" rel="noopener">Open here</a></div>`;
            } else {
                countEl.textContent = 'idle';
                listEl.innerHTML = `<p class="idle-state">idle</p>`;
            }
        });
        if (!hasAnyLink) {
            sections.forEach(section => {
                const listEl = document.getElementById(section.listId);
                const countEl = document.getElementById(section.countId);
                if (listEl) listEl.innerHTML = `<p class="muted">No materials available</p>`;
                if (countEl) countEl.textContent = '0 files';
            });
        }
    } else {
        // No materials available for this course
        ['allMaterialsList','midMaterialsList','finalMaterialsList'].forEach(id => {
            const listEl = document.getElementById(id);
            if (listEl) listEl.innerHTML = `<p class="muted">No materials available</p>`;
        });
        ['allCount','midCount','finalCount'].forEach(id => {
            const countEl = document.getElementById(id);
            if (countEl) countEl.textContent = '0 files';
        });
        console.log('No materials data for course:', courseCode);
    }

    function attachFolderButtons(sectionMap) {
        const idBySection = { ALL: 'allMaterialsList', MID: 'midMaterialsList', FINAL: 'finalMaterialsList' };
        Object.keys(sectionMap).forEach(section => {
            const url = sectionMap[section];
            if (!url) return;
            const listId = idBySection[section];
            const listEl = document.getElementById(listId);
            if (!listEl) return;
            const cardEl = listEl.closest('.materials-card');
            if (!cardEl) return;
            const headerEl = cardEl.querySelector('.materials-card-header');
            if (!headerEl) return;
            // Avoid duplicate button
            if (headerEl.querySelector('.open-folder-link')) return;

            // Create a non-clickable orange label instead of a link
            const label = document.createElement('span');
            label.textContent = 'Open';
            label.className = 'open-folder-link';
            label.style.marginLeft = '8px';
            label.style.color = 'var(--accent)';
            label.style.fontWeight = '600';
            headerEl.appendChild(label);
        });
    }

    function setSectionAsOpenLink(listId, countId, url, label) {
        const listEl = document.getElementById(listId);
        const countEl = document.getElementById(countId);
        if (!listEl || !url) return;
        // Add folder link above materials if materials exist, else just show folder link
        const currentHtml = listEl.innerHTML;
        const folderLinkHtml = `<div class="material-item"><a class="no-underline" href="${url}" target="_blank" rel="noopener">${label || 'Open'}</a></div>`;
        if (currentHtml && currentHtml.trim() !== '') {
            listEl.innerHTML = folderLinkHtml + currentHtml;
        } else {
            listEl.innerHTML = folderLinkHtml;
        }
        if (countEl) countEl.textContent = `${countEl.textContent} + folder`;
    }

    function setSectionMessage(listId, countId, text) {
        const listEl = document.getElementById(listId);
        const countEl = document.getElementById(countId);
        if (!listEl) return;
        if (countEl) countEl.textContent = '';
        listEl.innerHTML = `<p class="muted">${text}</p>`;
    }

})();
