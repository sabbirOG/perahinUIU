// Minimal filtering for Events page (simple and non-intrusive)
(function() {
	const q = document.getElementById('eventSearch');
	const type = document.getElementById('eventType');
	const month = document.getElementById('eventMonth');
	const list = document.getElementById('eventsList');
	if (!list) return;

	const items = Array.from(list.querySelectorAll('.list-item'));
	const norm = s => (s || '').toLowerCase().trim();

	function apply() {
		const term = norm(q && q.value);
		const t = type ? type.value : 'all';
		const m = month ? month.value : 'all';

		items.forEach(el => {
			const text = norm(el.textContent);
			const et = el.getAttribute('data-type') || 'other';
			const ed = el.getAttribute('data-date') || '';
			let ok = true;
			if (term && !text.includes(term)) ok = false;
			if (ok && t !== 'all' && et !== t) ok = false;
			if (ok && m !== 'all' && !ed.startsWith(m)) ok = false;
			el.style.display = ok ? '' : 'none';
		});
	}

	[q, type, month].forEach(ctrl => ctrl && ctrl.addEventListener('input', apply));
	[type, month].forEach(ctrl => ctrl && ctrl.addEventListener('change', apply));
	apply();
})();


