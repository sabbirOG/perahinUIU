// Simple client-side search filter for the Courses page
// ...existing code...
(function () {
	const showAllBtn = document.getElementById('showAllCoursesBtn');
	let showingAll = false;

	const input = document.getElementById('courseSearchInput');
	const clearBtn = document.getElementById('courseSearchClear');
	const countEl = document.getElementById('courseSearchCount');
	const list = document.getElementById('coursesList');
	const noMsg = document.getElementById('noCoursesMsg');
	const trimesterSelect = document.getElementById('trimesterSelect');
	const moreSelect = document.getElementById('moreSelect');
	const advanceFilter = document.getElementById('advanceFilter');
	const advanceSelect = document.getElementById('advanceSelect');
	if (!input || !list) return;

	const items = Array.from(list.querySelectorAll('.list-item'));
	const normalize = (s) => (s || '').toLowerCase().trim();

	function debounce(fn, ms) {
		let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(null, args), ms); };
	}

	function setCount(n, total) {
		if (!countEl) return;
		countEl.textContent = n === total ? `${n} course${n!==1?'s':''}` : `${n} of ${total} shown`;
	}

	function toggleNoResults(n) {
		if (!noMsg) return;
		noMsg.hidden = n !== 0;
	}

	function escapeRegExp(str){ return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

	function highlight(el, q) {
		const title = el.querySelector('.course-title');
		if (!title) return;
		if (!title.dataset.orig) title.dataset.orig = title.textContent;
		const base = title.dataset.orig;
		if (!q) { title.innerHTML = base; return; }
		const re = new RegExp(`(${escapeRegExp(q)})`, 'ig');
		title.innerHTML = base.replace(re, '<mark>$1</mark>');
	}

	function filterList(term, trimester, majorValue) {
		const q = normalize(term);
		let visible = 0;
		items.forEach((el) => {
			const text = normalize(el.textContent);
			const itemTrimester = el.getAttribute('data-trimester');
			let isGED = text.includes('ged');
			let match = true;

			// First, apply filters
			let trimesterMatch = !trimester || trimester === 'all' || itemTrimester === trimester;
			if (trimester !== 'all' && isGED) {
				trimesterMatch = false;
			}
			match = trimesterMatch;
			if (moreSelect) {
				if (moreSelect.value === 'ged') {
					match = match && isGED;
				}
				if (moreSelect.value === 'lab') {
					const courseTitle = el.querySelector('.course-title');
					const titleText = courseTitle ? courseTitle.textContent.toLowerCase() : '';
					match = match && titleText.includes('lab');
				}
				if (moreSelect.value === 'fydp') {
					match = match && (text.includes('fydp') || text.includes('final year design project'));
				}
				if (moreSelect.value === 'major') {
					match = match && el.hasAttribute('data-major');
					// If advanceSelect is visible and not 'all', further filter by value
					if (advanceFilter && advanceFilter.style.display !== 'none' && advanceSelect && advanceSelect.value !== 'all') {
						match = match && el.getAttribute('data-major') === advanceSelect.value;
					}
				}
			}

			// Then, apply search only to filtered courses
			if (match && q) {
				match = text.includes(q);
			}

			el.style.display = match ? '' : 'none';
			highlight(el, q);
			if (match) visible++;
		});
		setCount(visible, items.length);
		toggleNoResults(visible);
		if (clearBtn) clearBtn.classList.toggle('show', !!q);
		showingAll = false;
		updateVisibleCourses();
	}

	function updateVisibleCourses() {
		// For overview: if trimester is 'all' and no search, show only 4 items
		const isAll = trimesterSelect && trimesterSelect.value === 'all';
		const hasQuery = input && normalize(input.value).length > 0;
		const limit = (!showingAll && isAll && !hasQuery) ? 4 : 5;

		// If advance search is active and 'All Majors' is selected, only show major courses
	const isAdvanceMajorAll = moreSelect && moreSelect.value === 'major' && advanceSelect && advanceSelect.value === 'all';
	const isElective = moreSelect && moreSelect.value === 'elective';
		if (showingAll) {
			items.forEach(el => {
				if (isAdvanceMajorAll || isElective) {
					el.style.display = el.hasAttribute('data-major') ? '' : 'none';
				} else {
					el.style.display = '';
				}
			});
			if (showAllBtn) {
				showAllBtn.textContent = 'Show Less';
				showAllBtn.style.display = 'block';
			}
			return;
		}
		let shown = 0;
		items.forEach((el) => {
			if (el.style.display === 'none') return;
			shown++;
			el.style.display = shown <= limit ? '' : 'none';
		});
		if (showAllBtn) {
			const shouldShow = shown > limit;
			showAllBtn.style.display = shouldShow ? 'block' : 'none';
			showAllBtn.textContent = 'Show All Courses';
		}
	}

	if (showAllBtn) {
		showAllBtn.addEventListener('click', function() {
			if (showingAll) {
				// Toggle back to showing less
				showingAll = false;
				updateVisibleCourses();
			} else {
				// Show all
				showingAll = true;
				updateVisibleCourses();
			}
		});
	}

	const run = debounce(() => filterList(input.value, trimesterSelect ? trimesterSelect.value : 'all', advanceSelect ? advanceSelect.value : 'all'), 150);
	input.addEventListener('input', run);
	if (trimesterSelect) trimesterSelect.addEventListener('change', () => filterList(input.value, trimesterSelect.value, advanceSelect ? advanceSelect.value : 'all'));

	// Advance filter logic
	if (moreSelect) {
		moreSelect.addEventListener('change', function() {
			if (moreSelect.value === 'major') {
				if (advanceFilter) advanceFilter.style.display = 'flex';
			} else {
				if (advanceFilter) advanceFilter.style.display = 'none';
				if (advanceSelect) advanceSelect.value = 'all';
			}
			filterList(input.value, trimesterSelect ? trimesterSelect.value : 'all', advanceSelect ? advanceSelect.value : 'all');
		});
	}
	if (advanceSelect) {
		advanceSelect.addEventListener('change', run);
	}

	// Clear and Esc
	input.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			input.value = '';
			filterList('', trimesterSelect ? trimesterSelect.value : 'all', advanceSelect ? advanceSelect.value : 'all');
			input.blur();
		}
	});
	if (clearBtn) clearBtn.addEventListener('click', () => { input.value=''; filterList('', trimesterSelect ? trimesterSelect.value : 'all', advanceSelect ? advanceSelect.value : 'all'); input.focus(); });

	// Reset all filters and search
	const resetBtn = document.getElementById('resetAllSearch');
	if (resetBtn) {
		resetBtn.addEventListener('click', () => {
			input.value = '';
			if (trimesterSelect) trimesterSelect.value = 'all';
			if (moreSelect) moreSelect.value = 'all';
			if (advanceSelect) advanceSelect.value = 'all';
			if (advanceFilter) advanceFilter.style.display = 'none';
			filterList('', 'all', 'all');
			input.focus();
		});
	}

	// Initial state
	filterList('', trimesterSelect ? trimesterSelect.value : 'all', advanceSelect ? advanceSelect.value : 'all');
})();

// Materials button click handler
(function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('materials-btn')) {
            // Extract course title from the course item
            const courseItem = e.target.closest('.list-item');
            const courseTitleEl = courseItem.querySelector('.course-title');
            const courseTitle = courseTitleEl ? courseTitleEl.textContent : 'Course';
            const courseCode = courseTitle.split('·')[0].trim();
            
            // Navigate to materials page with course info
            window.location.href = `course-materials.html?code=${encodeURIComponent(courseCode)}&title=${encodeURIComponent(courseTitle)}`;
        }
    });
})();


