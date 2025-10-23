// PlayList Page Script - Render full list, search, and navigate to YouTube Playlists
(function () {
    const input = document.getElementById('playlistSearch');
    const clearBtn = document.getElementById('playlistSearchClear');
    const countEl = document.getElementById('playlistSearchCount');
    const list = document.getElementById('playlistList');
    const noMsg = document.getElementById('noPlaylistsMsg');
    if (!input || !list) return;

    // Map of YouTube playlist URLs by course code (fill in as available)
    const playlistUrls = {
        'ENG1011': 'https://youtube.com/playlist?list=PLPKuptha2cLlTrmho6RMbcEVQ8Dta2-1N&si=xYRmo6yVXaZ3GWBN',
        'ENG1013': 'https://youtube.com/playlist?list=PLPKuptha2cLm5qw8gWrc8Zqd48z2e12D7&si=8qncilhY_Y0FW2H1',
        'CSE1115': 'https://youtube.com/playlist?list=PL3_ATDyQLqPjwBwhdQ-zCwreAag48ReAr&si=30ngblQ49acr3X5j',
        'CSE2215': 'https://youtube.com/playlist?list=PL3_ATDyQLqPiE99cj8vTDBqoIe1RPx2xB&si=r5nBRPe65LIWraWQ',
        'MATH1151': 'https://youtube.com/playlist?list=PL3_ATDyQLqPgSXzY50bxmyipW0ob2UThn&si=0uO3GMg2eRaMeZlu',
        'CSE3811': 'https://youtube.com/playlist?list=PL3_ATDyQLqPjqdSnQokgNsjCQUwcMsMIB&si=9I-0qPH9_LU0-J35',
        'CSE2233': 'https://youtube.com/playlist?list=PL3_ATDyQLqPiZrS0emDuD0NqFusfnV5bf&si=s0NFmzzeCCo-zTOn',
        'CSE3521': 'https://youtube.com/playlist?list=PLLcmBPjTlvV0bwHpQZXDiyEVguULMGTVX&si=Zjx42Q18fx7_dOFA',
        'CSE3313': 'https://youtube.com/playlist?list=PL1wysh73nDqREHHKru0TaGu6qUWZTddOF&si=T5lqHGH5yg6uLtyd',
        'CSE3411': 'https://youtube.com/playlist?list=PL3_ATDyQLqPi8dfAhsyq2KQxcPECqHeRg&si=jAAiG4g2l6rhCnc_',
        'EEE2123': 'https://youtube.com/playlist?list=PL3_ATDyQLqPi0d6MXE7qf4NDv6Zpf44Hh&si=8AEzBLoG-Ozq5YPd',
        'EEE2113': 'https://youtube.com/playlist?list=PLeZJy4pEspfXnRNQVBZNWV3o6iW1EFkuh&si=l59tf1v9oguhgF7y',
        'GED OPT1': 'https://youtube.com/playlist?list=PL3_ATDyQLqPgUezIIsAcggyH5Ob6ly4VP&si=lbqiM1pHpKhzb8BH',
        'GED OPT3': 'https://youtube.com/playlist?list=PL3_ATDyQLqPifXICH5aBFgZHJkFvsxg_I&si=MvvIVd7WXnUbqjvd'
        // Add more mappings here, e.g. 'CSE1111': 'https://www.youtube.com/playlist?list=...'
    };

    // Optional attribution for who curated/created the playlist per course (single-source legacy)
    const playlistMeta = {
        // Example: show name on the second line like: "Playlist | {Name}"
        'ENG1011': { by: 'Student' },
        'ENG1013': { by: 'Student' },
        'CSE1115': { by: 'Fahim Shahriar' },
        'CSE2215': { by: 'Dr. Nurul Huda' },
        'CSE2233': { by: 'Nabila Sabrin Sworna' },
        'CSE3521': { by: 'Imam Hossain' },
        'CSE3313': { by: 'Shoaib Ahmed Shourov' },
        'CSE3411': { by: 'Farhanaz Farheen' },
        'MATH1151': { by: 'JAS. Jashodhan Saha' },
        'EEE2113': { by: 'Fahim Hafiz' },
        'EEE2123': { by: 'Abir Hassan' },
        'CSE3811': { by: 'Rubaiya Ratin Khan' },
        'GED OPT1': { by: 'Mohamad Amzad Hossain' },
        'GED OPT3': { by: 'Gourab Kumar Roy' }
        // Add more: 'CSE3313': { by: 'Name' }, etc.
    };

    // Support multiple sources per course (e.g., multiple playlists or a video + playlist)
    // Each source can include an optional 'by' for attribution.
    const playlistSources = {
        // Add arrays for courses that have multiple sources
    };

    // Complete course list mirrored from Courses page with trimester data
    const allCourses = [
        // 1st Trimester
        { code: 'ENG1011', name: 'English I', trimester: 1 },
        { code: 'BDS1201', name: 'History of the Emergence of Bangladesh', trimester: 1 },
        { code: 'CSE1110', name: 'Introduction to Computer Systems', trimester: 1 },
        { code: 'MATH1151', name: 'Fundamental Calculus', trimester: 1 },
        // 2nd Trimester
        { code: 'ENG1013', name: 'English II', trimester: 2 },
        { code: 'CSE1111', name: 'Structured Programming Language', trimester: 2 },
        { code: 'CSE1112', name: 'Structured Programming Language Laboratory', trimester: 2 },
        { code: 'CSE2213', name: 'Discrete Mathematics', trimester: 2 },
        // 3rd Trimester
        { code: 'MATH2183', name: 'Calculus and Linear Algebra', trimester: 3 },
        { code: 'PHY2105', name: 'Physics', trimester: 3 },
        { code: 'PHY2106', name: 'Physics Lab', trimester: 3 },
        { code: 'CSE2215', name: 'Data Structure and Algorithms I', trimester: 3 },
        { code: 'CSE2216', name: 'Data Structure and Algorithms I Laboratory', trimester: 3 },
        // 4th Trimester
        { code: 'MATH2201', name: 'Coordinate Geometry and Vector Analysis', trimester: 4 },
        { code: 'CSE1325', name: 'Digital Logic Design', trimester: 4 },
        { code: 'CSE1326', name: 'Digital Logic Design Lab', trimester: 4 },
        { code: 'CSE1115', name: 'Object Oriented Programming', trimester: 4 },
        { code: 'CSE1116', name: 'Object Oriented Programming Lab', trimester: 4 },
        // 5th Trimester
        { code: 'MATH2205', name: 'Probability and Statistics', trimester: 5 },
        { code: 'SOC2101', name: 'Society, Technology and Engineering Ethics', trimester: 5 },
        { code: 'CSE2217', name: 'Data Structure and Algorithms II', trimester: 5 },
        { code: 'CSE2218', name: 'Data Structure and Algorithms II Laboratory', trimester: 5 },
        { code: 'EEE2113', name: 'Electrical Circuits', trimester: 5 },
        // 6th Trimester
        { code: 'CSE3521', name: 'Database Management Systems', trimester: 6 },
        { code: 'CSE3522', name: 'Database Management Systems Lab', trimester: 6 },
        { code: 'EEE2123', name: 'Electronics', trimester: 6 },
        { code: 'EEE2124', name: 'Electronics Lab', trimester: 6 },
        { code: 'CSE4165', name: 'Web Programming', trimester: 6 },
        // 7th Trimester
        { code: 'CSE3313', name: 'Computer Architecture', trimester: 7 },
        { code: 'CSE2118', name: 'Advanced Object Oriented Programming Lab', trimester: 7 },
        { code: 'BIO3105', name: 'Biology for Engineers', trimester: 7 },
        { code: 'CSE3411', name: 'System Analysis and Design', trimester: 7 },
        { code: 'CSE3412', name: 'System Analysis and Design Lab', trimester: 7 },
        // 8th Trimester
        { code: 'CSE4325', name: 'Microprocessors and Microcontrollers', trimester: 8 },
        { code: 'CSE4326', name: 'Microprocessors and Microcontrollers Lab', trimester: 8 },
        { code: 'CSE3421', name: 'Software Engineering', trimester: 8 },
        { code: 'CSE3422', name: 'Software Engineering Lab', trimester: 8 },
        { code: 'CSE3811', name: 'Artificial Intelligence', trimester: 8 },
        { code: 'CSE3812', name: 'Artificial Intelligence Lab', trimester: 8 },
        // 9th Trimester
        { code: 'CSE2233', name: 'Theory of Computation', trimester: 9 },
        { code: 'GED OPT1', name: 'General Education Optional – I (ACT 2111)', trimester: 9 },
        { code: 'PMG4101', name: 'Project Management', trimester: 9 },
        { code: 'CSE3711', name: 'Computer Networks', trimester: 9 },
        { code: 'CSE3712', name: 'Computer Networks Lab', trimester: 9 },
        // 10th Trimester
        { code: 'GED OPT2', name: 'General Education Optional-II', trimester: 10 },
        { code: 'CSE4000A', name: 'Final Year Design Project - I', trimester: 10 },
        { code: 'CSE****', name: 'Elective – I', trimester: 10 },
        { code: 'CSE4509', name: 'Operating Systems', trimester: 10 },
        { code: 'CSE4510', name: 'Operating Systems Laboratory', trimester: 10 },
        // 11th Trimester
        { code: 'GED OPT3', name: 'General Education Optional – III (IPE - 3401)', trimester: 11 },
        { code: 'CSE****', name: 'Elective – II', trimester: 11 },
        { code: 'CSE****', name: 'Elective – III', trimester: 11 },
        { code: 'CSE4000B', name: 'Final Year Design Project - II', trimester: 11 },
        { code: 'CSE4531', name: 'Computer Security', trimester: 11 },
        // 12th Trimester
        { code: 'CSE4000C', name: 'Final Year Design Project - III', trimester: 12 },
        { code: 'EEE4261', name: 'Green Computing', trimester: 12 },
        { code: 'CSE****', name: 'Elective – IV', trimester: 12 },
        { code: 'CSE****', name: 'Elective – V', trimester: 12 }
    ];

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
        
        allCourses.forEach((course, index) => {
            // Prefer multi-source entries when available, otherwise derive from legacy single mapping
            let sources = playlistSources[course.code];
            if (!sources || sources.length === 0) {
                if (playlistUrls[course.code]) {
                    const meta = playlistMeta[course.code] || {};
                    sources = [{ url: playlistUrls[course.code], label: 'Playlist', by: meta.by }];
                } else {
                    sources = [];
                }
            }

            const hasPlaylist = sources.length > 0;
            const names = Array.from(new Set(sources.map(s => s.by).filter(Boolean)));
            const infoText = names.length > 1
                ? `Playlists | ${names.join(', ')}`
                : (names.length === 1 ? `Playlist | ${names[0]}` : (hasPlaylist ? 'Playlist' : 'YouTube Playlist TBA'));
            const item = document.createElement('div');
            item.className = 'list-item';
            
            // Add hidden-initially class to items beyond the first 4
            if (index >= INITIAL_VISIBLE_COUNT) {
                item.classList.add('hidden-initially');
            }
            
            item.setAttribute('data-course', course.code);
            item.setAttribute('data-index', index);
            item.setAttribute('data-trimester', course.trimester);
                const buttons = hasPlaylist
                    ? sources.map(s => {
                        const titleText = s.by ? `Open ${s.label || 'playlist'} by ${s.by}` : `Open ${s.label || 'playlist'}`;
                        return `<button class="btn playlist-btn" data-course="${course.code}" data-url="${s.url}" title="${titleText}">Go</button>`;
                    }).join('\n')
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
        
        // Add "Show All" button if there are more than 4 courses
        if (allCourses.length > INITIAL_VISIBLE_COUNT) {
            const showAllBtn = document.createElement('button');
            showAllBtn.className = 'btn';
            showAllBtn.id = 'showAllBtn';
            showAllBtn.type = 'button';
            showAllBtn.textContent = 'Show All Playlists';
            showAllBtn.style.margin = '18px auto 0';
            showAllBtn.style.display = 'block';
            list.appendChild(showAllBtn);
            
            // Add click handler for Show All button
            showAllBtn.addEventListener('click', toggleShowAll);
        }
    }
    
    function toggleShowAll() {
        const listElement = document.getElementById('playlistList');
        const showAllBtn = document.getElementById('showAllBtn');
        const trimesterSelect = document.getElementById('trimesterSelect');
        const isShowingAll = listElement.classList.contains('show-all-playlists');
        
        if (isShowingAll) {
            // Show less
            listElement.classList.remove('show-all-playlists');
            showAllBtn.textContent = 'Show All Playlists';
            
            // Re-filter to show only first 4
            filterList(input.value, trimesterSelect ? trimesterSelect.value : 'all');
            
            // Scroll to top of list smoothly
            const card = listElement.closest('.card');
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // Show all
            listElement.classList.add('show-all-playlists');
            showAllBtn.textContent = 'Show Less';
            
            // Re-filter to show all
            filterList(input.value, trimesterSelect ? trimesterSelect.value : 'all');
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
            const text = normalize(el.textContent);
            const itemTrimester = el.getAttribute('data-trimester');
            const trimesterMatch = !trimester || trimester === 'all' || itemTrimester === trimester;
            const searchMatch = !q || text.includes(q);
            const match = searchMatch && trimesterMatch;
            
            // When searching or filtering by trimester, override the hidden-initially behavior
            if (q || (trimester && trimester !== 'all')) {
                el.style.display = match ? 'flex' : 'none';
            } else {
                // When not searching/filtering, respect the show-all state
                const isShowingAll = list.classList.contains('show-all-playlists');
                const isInitiallyHidden = el.classList.contains('hidden-initially');
                
                if (isInitiallyHidden && !isShowingAll) {
                    el.style.display = 'none';
                } else {
                    el.style.display = match ? 'flex' : 'none';
                }
            }
            
            highlight(el, q);
            if (match && el.style.display !== 'none') {
                visible++;
            }
            if (match) {
                matchingBeforeLimit++;
            }
        });
        
        // Hide Show All button when searching or filtering by specific trimester
        if (showAllBtn) {
            const shouldShowButton = !q && (!trimester || trimester === 'all') && matchingBeforeLimit > INITIAL_VISIBLE_COUNT;
            showAllBtn.style.display = shouldShowButton ? 'block' : 'none';
        }
        
        setCount(visible, items.length);
        toggleNoResults(visible);
        if (clearBtn) clearBtn.classList.toggle('show', !!q);
    }

    // Render then wire up interactions
    renderList();

    const trimesterSelect = document.getElementById('trimesterSelect');
    
    const run = debounce(() => filterList(input.value, trimesterSelect ? trimesterSelect.value : 'all'), 150);
    input.addEventListener('input', run);
    
    if (trimesterSelect) {
        trimesterSelect.addEventListener('change', () => {
            // Reset show-all state when changing trimester
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
        input.value=''; 
        filterList('', trimesterSelect ? trimesterSelect.value : 'all'); 
        input.focus(); 
    });

    // Click handling for Go buttons (opens in new tab if URL exists)
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.playlist-btn');
        if (!btn) return;
        // Prefer explicit data-url on button (multi-source). Fallback to legacy single mapping.
        const directUrl = btn.getAttribute('data-url');
        let url = directUrl;
        if (!url) {
            const code = btn.getAttribute('data-course');
            url = playlistUrls[code];
        }
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            // Soft UX: disabled button should prevent click, but fallback alert just in case
            const code = btn.getAttribute('data-course') || 'this course';
            alert('Playlist coming soon for ' + code);
        }
    });

    // Initial filter
    filterList('', trimesterSelect ? trimesterSelect.value : 'all');
})();
