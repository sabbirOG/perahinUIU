// PlayList Page Script - Render full list, search, and navigate to YouTube Playlists
(function () {
    const input = document.getElementById('playlistSearch');
    const clearBtn = document.getElementById('playlistSearchClear');
    const countEl = document.getElementById('playlistSearchCount');
    const list = document.getElementById('playlistList');
    const noMsg = document.getElementById('noPlaylistsMsg');
    if (!input || !list) return;

    // Import playlists from playlistData.js
    // If using ES modules, use: import { playlists } from './playlistData.js';
    // If using a global variable, ensure playlistData.js exposes window.playlists
    let playlists = window.playlists || [];

    // Allow dynamic addition of courses

    const normalize = (s) => (s || '').toLowerCase().trim();

    function debounce(fn, ms) {
        let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(null, args), ms); };
    }
    function setCount(n, total) {
        if (!countEl) return;
        countEl.textContent = n === total ? `${n} course${n !== 1 ? 's' : ''}` : `${n} of ${total} shown`;
    }
    function toggleNoResults(n) { if (noMsg) noMsg.hidden = n !== 0; }
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

    function renderList() {
        list.innerHTML = '';
        const frag = document.createDocumentFragment();
        const INITIAL_VISIBLE_COUNT = 4;
        playlists.forEach((course, index) => {
            const hasPlaylist = !!course.url;
            const infoText = hasPlaylist
                ? (course.by ? `Playlist | ${course.by}` : 'Playlist')
                : 'YouTube Playlist TBA';
            const item = document.createElement('div');
            item.className = 'list-item';
            if (index >= INITIAL_VISIBLE_COUNT) {
                item.classList.add('hidden-initially');
            }
            item.setAttribute('data-course', course.code);
            item.setAttribute('data-index', index);
            item.setAttribute('data-trimester', course.trimester);
            const buttons = hasPlaylist
                ? `<button class="btn playlist-btn" data-course="${course.code}" data-url="${course.url}" title="Open playlist${course.by ? ' by ' + course.by : ''}">Go</button>`
                : `<button class="btn playlist-btn" disabled data-course="${course.code}">TBA</button>`;
            item.innerHTML = `
                <div>
                    <div class="course-title" style="font-weight:600;">${course.code} · ${course.name}</div>
                    <div class="muted">${infoText}</div>
                </div>
                <div style="display:flex; gap:8px; align-items:center;">
                    ${buttons}
                </div>
            `;
            frag.appendChild(item);
        });
        list.appendChild(frag);
        if (playlists.length > INITIAL_VISIBLE_COUNT) {
            const showAllBtn = document.createElement('button');
            showAllBtn.className = 'btn';
            showAllBtn.id = 'showAllBtn';
            showAllBtn.type = 'button';
            showAllBtn.textContent = 'Show All Playlists';
            showAllBtn.style.margin = '18px auto 0';
            showAllBtn.style.display = 'block';
            list.appendChild(showAllBtn);
            showAllBtn.addEventListener('click', toggleShowAll);
        }
    }

    function filterList(term, trimester) {
        const q = normalize(term);
        const items = Array.from(list.querySelectorAll('.list-item'));
        const showAllBtn = document.getElementById('showAllBtn');
        let visible = 0;
        let matchingBeforeLimit = 0;
        const INITIAL_VISIBLE_COUNT = 4;
        items.forEach((el) => {
            const code = normalize(el.getAttribute('data-course'));
            const name = normalize(el.querySelector('.course-title')?.textContent || '');
            const itemTrimester = el.getAttribute('data-trimester');
            let trimesterMatch;
            if (trimester === 'major') {
                trimesterMatch = itemTrimester === '0';
            } else {
                trimesterMatch = !trimester || trimester === 'all' || itemTrimester === trimester;
            }
            const searchMatch = !q || code.includes(q) || name.includes(q);
            const match = searchMatch && trimesterMatch;
            if (q || (trimester && trimester !== 'all')) {
                el.style.display = match ? 'flex' : 'none';
            } else {
                const isShowingAll = list.classList.contains('show-all-playlists');
                const isInitiallyHidden = el.classList.contains('hidden-initially');
                if (isInitiallyHidden && !isShowingAll) {
                    el.style.display = 'none';
                } else {
                    el.style.display = match ? 'flex' : 'none';
                }
            }
            // Highlight search term in code and name
            const title = el.querySelector('.course-title');
            if (title) {
                if (!title.dataset.orig) title.dataset.orig = title.textContent;
                const base = title.dataset.orig;
                if (!q) {
                    title.innerHTML = base;
                } else {
                    const re = new RegExp(`(${escapeRegExp(q)})`, 'ig');
                    title.innerHTML = base.replace(re, '<mark>$1</mark>');
                }
            }
            if (match && el.style.display !== 'none') {
                visible++;
            }
            if (match) {
                matchingBeforeLimit++;
            }
        });
        if (showAllBtn) {
            const shouldShowButton = !q && (!trimester || trimester === 'all') && matchingBeforeLimit > INITIAL_VISIBLE_COUNT;
            showAllBtn.style.display = shouldShowButton ? 'block' : 'none';
        }
        setCount(visible, items.length);
        toggleNoResults(visible);
        if (clearBtn) clearBtn.classList.toggle('show', !!q);
    }

    function toggleShowAll() {
        const listElement = document.getElementById('playlistList');
        const showAllBtn = document.getElementById('showAllBtn');
        const trimesterSelect = document.getElementById('trimesterSelect');
        const isShowingAll = listElement.classList.contains('show-all-playlists');
        if (isShowingAll) {
            listElement.classList.remove('show-all-playlists');
            showAllBtn.textContent = 'Show All Playlists';
            filterList(input.value, trimesterSelect ? trimesterSelect.value : 'all');
            const card = listElement.closest('.card');
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            listElement.classList.add('show-all-playlists');
            showAllBtn.textContent = 'Show Less';
            filterList(input.value, trimesterSelect ? trimesterSelect.value : 'all');
        }
    }

    renderList();
    const trimesterSelect = document.getElementById('trimesterSelect');
    const run = debounce(() => filterList(input.value, trimesterSelect ? trimesterSelect.value : 'all'), 150);
    input.addEventListener('input', run);
    if (trimesterSelect) {
        trimesterSelect.addEventListener('change', () => {
            list.classList.remove('show-all-playlists');
            const showAllBtn = document.getElementById('showAllBtn');
            if (showAllBtn) {
                showAllBtn.textContent = 'Show All Playlists';
            }
            filterList(input.value, trimesterSelect.value);
        });
    }
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            input.value = '';
            filterList('', trimesterSelect ? trimesterSelect.value : 'all');
            input.blur();
        }
    });
    if (clearBtn) clearBtn.addEventListener('click', () => {
        input.value = '';
        filterList('', trimesterSelect ? trimesterSelect.value : 'all');
        input.focus();
    });
    // RESET button logic
    const resetBtn = document.getElementById('playlistSearchReset');
    if (resetBtn) resetBtn.addEventListener('click', () => {
        input.value = '';
        if (trimesterSelect) trimesterSelect.value = 'all';
        list.classList.remove('show-all-playlists');
        const showAllBtn = document.getElementById('showAllBtn');
        if (showAllBtn) showAllBtn.textContent = 'Show All Playlists';
        filterList('', 'all');
        input.focus();
    });
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.playlist-btn');
        if (!btn) return;
        const directUrl = btn.getAttribute('data-url');
        let url = directUrl;
        if (!url) {
            const code = btn.getAttribute('data-course');
            url = playlistUrls[code];
        }
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            const code = btn.getAttribute('data-course') || 'this course';
            alert('Playlist coming soon for ' + code);
        }
    });
    filterList('', trimesterSelect ? trimesterSelect.value : 'all');
})();
