// --- DYNAMIC SEARCH/FILTER LOGIC ---
function renderCourses(filteredCourses = null, searchTerm = '') {
  const container = document.getElementById('courseListContainer');
  if (!container || !window.coursesData) return;
  container.innerHTML = '';
  const courses = filteredCourses || window.coursesData;
  courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'list-item';
    card.setAttribute('data-trimester', course.trimester);
    card.setAttribute('data-major', course.major);
    let titleHTML = course.title;
    if (searchTerm) {
      const re = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
      titleHTML = course.title.replace(re, '<mark>$1</mark>');
    }
    card.innerHTML = `
      <div>
        <div class="course-title" style="font-weight:600;">${titleHTML}</div>
        <div class="muted">Prerequisite: ${course.prerequisite}</div>
        <div class="muted">Exam Day: ${course.examDay || ''} ${course.examSlot ? '| Slot: ' + course.examSlot : ''}</div>
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        <button class="btn materials-btn" data-course="${course.code}" data-course-title="${course.title}">Materials</button>
        <span class="badge">${course.credits} cr</span>
      </div>
    `;
    container.appendChild(card);
  });
  // Add missing setCount and toggleNoResults functions for search UI
  function setCount(n, total) {
    const countEl = document.getElementById('courseSearchCount');
    if (!countEl) return;
    countEl.textContent = n === total ? `${n} course${n!==1?'s':''}` : `${n} of ${total} shown`;
  }

  function toggleNoResults(n) {
    const noMsg = document.getElementById('noCoursesMsg');
    if (!noMsg) return;
    noMsg.hidden = n !== 0;
  }
  setCount(courses.length, window.coursesData.length);
  toggleNoResults(courses.length);
}

function filterCourses() {
  const input = document.getElementById('courseSearchInput');
  const trimesterSelect = document.getElementById('trimesterSelect');
  const moreSelect = document.getElementById('moreSelect');
  const advanceSelect = document.getElementById('advanceSelect');
  const advanceFilter = document.getElementById('advanceFilter');
  let term = input ? input.value.trim().toLowerCase() : '';
  let trimester = trimesterSelect ? trimesterSelect.value : 'all';
  let major = advanceSelect ? advanceSelect.value : 'all';
  let more = moreSelect ? moreSelect.value : 'all';

  let filtered = window.coursesData.filter(course => {
    let match = true;
    // If searching, ignore filters and search all courses
    if (term) {
      match = (
        course.title.toLowerCase().includes(term) ||
        (course.prerequisite && course.prerequisite.toLowerCase().includes(term)) ||
        (course.examDay && course.examDay.toLowerCase().includes(term)) ||
        (course.examSlot && course.examSlot.toLowerCase().includes(term))
      );
    } else {
      // Only apply filters if not searching
      if (trimester !== 'all') match = match && course.trimester === trimester;
      if (more === 'major') {
        match = match && course.major;
        if (advanceFilter && advanceFilter.style.display !== 'none' && major !== 'all') {
          match = match && course.major === major;
        }
      }
      if (more === 'lab') match = match && course.title.toLowerCase().includes('lab');
      if (more === 'ged') match = match && course.title.toLowerCase().includes('ged');
      if (more === 'fydp') match = match && (course.title.toLowerCase().includes('fydp') || course.title.toLowerCase().includes('final year design project'));
    }
    return match;
  });
  renderCourses(filtered, term);
}

window.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  const input = document.getElementById('courseSearchInput');
  const trimesterSelect = document.getElementById('trimesterSelect');
  const moreSelect = document.getElementById('moreSelect');
  const advanceSelect = document.getElementById('advanceSelect');
  const advanceFilter = document.getElementById('advanceFilter');
  const clearBtn = document.getElementById('courseSearchClear');
  const resetBtn = document.getElementById('resetAllSearch');

  if (input) input.addEventListener('input', filterCourses);
  if (trimesterSelect) trimesterSelect.addEventListener('change', filterCourses);
  if (moreSelect) moreSelect.addEventListener('change', filterCourses);
  if (advanceSelect) advanceSelect.addEventListener('change', filterCourses);
  if (clearBtn) clearBtn.addEventListener('click', () => { input.value = ''; filterCourses(); input.focus(); });
  if (resetBtn) resetBtn.addEventListener('click', () => {
    if (input) input.value = '';
    if (trimesterSelect) trimesterSelect.value = 'all';
    if (moreSelect) moreSelect.value = 'all';
    if (advanceSelect) advanceSelect.value = 'all';
    if (advanceFilter) advanceFilter.style.display = 'none';
    filterCourses();
    if (input) input.focus();
  });
});

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


