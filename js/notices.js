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
})();


