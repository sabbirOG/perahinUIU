// resources.js
// Dynamically render resource cards from resourcesData.js

document.addEventListener('DOMContentLoaded', function() {
  if (typeof resourcesData !== 'undefined') {
    const section = document.querySelector('section.grid.cols-3');
    if (section) {
      section.innerHTML = '';
      resourcesData.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'card resource-card';
        card.innerHTML = `
          <h3 class="resource-title">${resource.title}</h3>
          <div class="resource-category">${resource.category || ''}</div>
          <p class="muted" style="margin-top: 8px; font-size: 13px;">${resource.description}</p>
          ${resource.contributor ? `<p class="muted" style="margin-top: 4px; font-size: 13px;">Thanks to <a href="${resource.contributor.link}" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: none; font-weight: 500;">${resource.contributor.name}</a> for this resource</p>` : ''}
          <div class="resource-actions">
            <a class="btn" href="${resource.link}" target="_blank" rel="noopener">${resource.button || 'Open'}</a>
          </div>
        `;
        section.appendChild(card);
      });
    }
  }
});
