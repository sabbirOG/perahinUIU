// Minimal filtering for Notices page (simple and non-intrusive)
(function() {
	const q = document.getElementById('noticeSearch');
	const cat = document.getElementById('noticeCategory');
	const dt = document.getElementById('noticeDate');
	const list = document.getElementById('noticesList');
	if (!list) return;

	const items = Array.from(list.querySelectorAll('.notice-card'));

	function norm(s){ return (s || '').toLowerCase().trim(); }

	function apply() {
		const term = norm(q && q.value);
		const category = cat ? cat.value : 'all';
		const date = dt ? dt.value : 'all';

		items.forEach(el => {
			const text = norm(el.textContent);
			const elCat = el.getAttribute('data-category') || 'general';
			const elDate = el.getAttribute('data-date') || '';
			let ok = true;
			if (term && !text.includes(term)) ok = false;
			if (ok && category !== 'all' && elCat !== category) ok = false;
			if (ok && date !== 'all' && !elDate.startsWith(date)) ok = false;
			el.style.display = ok ? '' : 'none';
		});
	}

	[q, cat, dt].forEach(ctrl => ctrl && ctrl.addEventListener('input', apply));
	[cat, dt].forEach(ctrl => ctrl && ctrl.addEventListener('change', apply));
	apply();
}());

document.addEventListener('DOMContentLoaded', function() {
  if (typeof noticesData !== 'undefined') {
    const noticesList = document.getElementById('noticesList');
    if (noticesList) {
      function renderNotices(filteredNotices) {
        noticesList.innerHTML = '';
        filteredNotices.forEach(notice => {
          const card = document.createElement('div');
          card.className = 'card notice-card' + (notice.category === 'important' ? ' important' : '');
          card.setAttribute('data-category', notice.category || 'general');
          card.setAttribute('data-date', notice.date);
          card.innerHTML = `
            <h2>${notice.title}
              ${notice.category === 'important' ? ' <span class="badge notice-badge">Important</span>' : ''}
              ${notice.category === 'general' ? ' <span class="badge notice-badge muted" style="background:#f3f3f3;color:#616161;">General</span>' : ''}
            </h2>
            <p class="muted"><span style="background:#f3f3f3;color:#444;border-radius:12px;padding:2px 10px 2px 10px;font-size:95%;margin-right:8px;display:inline-block;min-width:120px;text-align:center;">${formatNoticeDate(notice.date)}</span>· ${notice.details}</p>
          `;
          noticesList.appendChild(card);
        });
      }
      // Sort notices by date descending
      const sortedNotices = noticesData.slice().sort((a, b) => {
        const da = new Date(a.date);
        const db = new Date(b.date);
        return db - da;
      });
      // Filtering logic
      const q = document.getElementById('noticeSearch');
      const cat = document.getElementById('noticeCategory');
      const dt = document.getElementById('noticeDate');
      function norm(s){ return (s || '').toLowerCase().trim(); }
      function apply() {
        const term = norm(q && q.value);
        const category = cat ? cat.value : 'all';
        const date = dt ? dt.value : 'all';
        let filtered = sortedNotices.filter(notice => {
          let ok = true;
          const text = norm(notice.title + ' ' + notice.details);
          if (term && !text.includes(term)) ok = false;
          if (ok && category !== 'all' && (notice.category || 'general') !== category) ok = false;
          if (ok && date !== 'all') {
            // Match month only (MM)
            const noticeMonth = (new Date(notice.date).getMonth()+1).toString().padStart(2, '0');
            if (noticeMonth !== date) ok = false;
          }
          return ok;
        });
        renderNotices(filtered);
      }
      [q, cat, dt].forEach(ctrl => ctrl && ctrl.addEventListener('input', apply));
      [cat, dt].forEach(ctrl => ctrl && ctrl.addEventListener('change', apply));
      apply();
    }
  }
});

function formatNoticeDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}


