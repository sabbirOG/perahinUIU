// Course Materials Page Script
(function() {
    // Get course info from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseCode = urlParams.get('code');
    const courseTitle = urlParams.get('title');

    // Sample materials data (replace with your actual data)
    const materialsData = {
        'ENG1011': {
            all: ['Syllabus.pdf', 'Course Overview.pdf', 'Reading List.pdf'],
            mid: [],
            final: ['Final Exam Guide.pdf', 'Sample Papers.pdf']
        },
        'BDS1201': {
            all: ['Syllabus.pdf', 'Course Outline.pdf'],
            mid: ['Midterm Notes.pdf'],
            final: ['Final Review.pdf']
        }
        // Add more courses here as needed
    };

    // Update page title and info
    if (courseTitle) {
        document.getElementById('courseTitle').textContent = courseTitle;
        document.getElementById('courseInfo').textContent = 'Access all course materials organized by category';
    }

    // Load materials for the course
    if (courseCode && materialsData[courseCode]) {
        const materials = materialsData[courseCode];
        
        // Load ALL materials
        loadMaterialsSection('allMaterialsList', 'allCount', materials.all || []);
        
        // Load MID materials
        loadMaterialsSection('midMaterialsList', 'midCount', materials.mid || []);
        
        // Load FINAL materials
        loadMaterialsSection('finalMaterialsList', 'finalCount', materials.final || []);

        // Static folder links per course/section (Option B)
        const folderLinks = {
            'ENG1011': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1_xx5EfJc_42E4MoN6V72Bx7_cRHghRAt',
                MID: 'https://drive.google.com/drive/u/2/folders/13eGDaLe6BWlOk6i6wEir2u8RM-E_HYm0',
                FINAL: 'https://drive.google.com/drive/u/2/folders/1yHYi5CkLNCLKTHPzBabda5_6wYKj-bCG'
            },
            'MATH1151': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1L_sH06eyS5WXNB8XlXaO9A3Fih_6d4hT'
            },
            'CSE1110': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1ieLVvqnQES36mOfG4W6IIhLOghuoJEHL'
            },
            'BDS1201': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1oiv5L8AiQoBvjs5f-RpkSySQguNi2_QO'
            },
            'CSE3411': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1sb9l-zKKrdqL70rOO1AX3ztoMS6Oa1sw',
                MID: 'https://drive.google.com/drive/u/2/folders/1sqHdVB4dFUgu207l8AUGdtC-e-9yB9Dw',
                FINAL: 'https://drive.google.com/drive/u/2/folders/1xlOLypDy492L9_Cb8d6Obf7UcnNWfKJ_'
            },
            'GED OPT3': {
                ALL: 'https://drive.google.com/drive/u/2/folders/18QQmg0j4kXqkgVUyHW-BFgGmRg7tj2fe',
                MID: 'https://drive.google.com/drive/u/2/folders/1fbC9r6RywBtZ15-wUZdhRM98U6GoyaPG',
                FINAL: 'https://drive.google.com/drive/u/2/folders/1delG0rPab9oFcVREknsqocCXQZF_kja3'
            },
            'CSE3811': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1mfu5uL9oiqgeEBTugRaW44kWwu1hE1rM',
                MID: 'https://drive.google.com/drive/u/2/folders/1kVJvGHV8Rt_mD4REAJnpfau370WnhjOG',
                FINAL: 'https://drive.google.com/drive/u/2/folders/1mN63Wvi7_QCb5qg_54Mp7A9Bz9_1p66S'
            },
            'CSE3313': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1IASbQyNBjDMm0wJrYFboe8sq66ZqsRbV',
                MID: 'https://drive.google.com/drive/u/2/folders/142mID8LyTKoUuP_qjOT3sta6z6SbuB2J',
                FINAL: 'https://drive.google.com/drive/u/2/folders/104bntlemSVC3G8605vu7DArQ38Y9IIJI'
            }
        };

        // If section folder links exist, place an "Open here" link inside each card (ALL/MID/FINAL)
        const sectionMap = folderLinks[courseCode] || {};
        const idMap = {
            ALL: { list: 'allMaterialsList', count: 'allCount' },
            MID: { list: 'midMaterialsList', count: 'midCount' },
            FINAL: { list: 'finalMaterialsList', count: 'finalCount' }
        };
        ['ALL','MID','FINAL'].forEach(sec => {
            const url = sectionMap[sec];
            if (url) {
                setSectionAsOpenLink(idMap[sec].list, idMap[sec].count, url, 'Open here');
            }
        });
    } else {
        // No materials available for this course
        console.log('No materials data for course:', courseCode);
    }

    function loadMaterialsSection(listId, countId, files) {
        const listEl = document.getElementById(listId);
        const countEl = document.getElementById(countId);
        
        if (files.length > 0) {
            countEl.textContent = `${files.length} file${files.length !== 1 ? 's' : ''}`;
            listEl.innerHTML = files.map(file => 
                `<div class="material-item">
                    <a href="#">${file}</a>
                </div>`
            ).join('');
        } else {
            countEl.textContent = '0 files';
        }
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
        if (countEl) countEl.textContent = 'Open folder';
        listEl.innerHTML = `<div class="material-item"><a class="no-underline" href="${url}" target="_blank" rel="noopener">${label || 'Open'}</a></div>`;
    }

    function setSectionMessage(listId, countId, text) {
        const listEl = document.getElementById(listId);
        const countEl = document.getElementById(countId);
        if (!listEl) return;
        if (countEl) countEl.textContent = '';
        listEl.innerHTML = `<p class="muted">${text}</p>`;
    }

    // Apply folder links and guidance after materials rendering
    (function applyFolderLinksAndGuidance() {
        const folderLinksMap = {
            'ENG1011': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1_xx5EfJc_42E4MoN6V72Bx7_cRHghRAt',
                MID: 'https://drive.google.com/drive/u/2/folders/13eGDaLe6BWlOk6i6wEir2u8RM-E_HYm0',
                FINAL: 'https://drive.google.com/drive/u/2/folders/1yHYi5CkLNCLKTHPzBabda5_6wYKj-bCG'
            },
            'MATH1151': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1L_sH06eyS5WXNB8XlXaO9A3Fih_6d4hT'
            },
            'CSE1110': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1ieLVvqnQES36mOfG4W6IIhLOghuoJEHL'
            },
            'BDS1201': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1oiv5L8AiQoBvjs5f-RpkSySQguNi2_QO'
            },
            'CSE3411': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1sb9l-zKKrdqL70rOO1AX3ztoMS6Oa1sw',
                MID: 'https://drive.google.com/drive/u/2/folders/1sqHdVB4dFUgu207l8AUGdtC-e-9yB9Dw',
                FINAL: 'https://drive.google.com/drive/u/2/folders/1xlOLypDy492L9_Cb8d6Obf7UcnNWfKJ_'
            },
            'GED OPT3': {
                ALL: 'https://drive.google.com/drive/u/2/folders/18QQmg0j4kXqkgVUyHW-BFgGmRg7tj2fe',
                MID: 'https://drive.google.com/drive/u/2/folders/1fbC9r6RywBtZ15-wUZdhRM98U6GoyaPG',
                FINAL: 'https://drive.google.com/drive/u/2/folders/1delG0rPab9oFcVREknsqocCXQZF_kja3'
            },
            'CSE3811': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1mfu5uL9oiqgeEBTugRaW44kWwu1hE1rM',
                MID: 'https://drive.google.com/drive/u/2/folders/1kVJvGHV8Rt_mD4REAJnpfau370WnhjOG',
                FINAL: 'https://drive.google.com/drive/u/2/folders/1mN63Wvi7_QCb5qg_54Mp7A9Bz9_1p66S'
            },
            'CSE3313': {
                ALL: 'https://drive.google.com/drive/u/2/folders/1IASbQyNBjDMm0wJrYFboe8sq66ZqsRbV',
                MID: 'https://drive.google.com/drive/u/2/folders/142mID8LyTKoUuP_qjOT3sta6z6SbuB2J',
                FINAL: 'https://drive.google.com/drive/u/2/folders/104bntlemSVC3G8605vu7DArQ38Y9IIJI'
            }
        };

        const idMap = {
            ALL: { list: 'allMaterialsList', count: 'allCount' },
            MID: { list: 'midMaterialsList', count: 'midCount' },
            FINAL: { list: 'finalMaterialsList', count: 'finalCount' }
        };

        const map = folderLinksMap[courseCode] || {};
        // Place "Open here" links where URLs are provided
        ['ALL','MID','FINAL'].forEach(sec => {
            if (map[sec]) {
                setSectionAsOpenLink(idMap[sec].list, idMap[sec].count, map[sec], 'Open here');
            }
        });
        // If only ALL exists, show guidance on MID/FINAL
        if (map.ALL && !map.MID) {
            setSectionMessage(
                idMap.MID.list,
                idMap.MID.count,
                'check <span style="color: var(--accent); font-weight: 600;">ALL</span> for materials'
            );
        }
        if (map.ALL && !map.FINAL) {
            setSectionMessage(
                idMap.FINAL.list,
                idMap.FINAL.count,
                'check <span style="color: var(--accent); font-weight: 600;">ALL</span> for materials'
            );
        }
    })();
})();
