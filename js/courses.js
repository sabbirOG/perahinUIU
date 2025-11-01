// --- DYNAMIC SEARCH/FILTER LOGIC ---
let showAllCourses = false;
function renderCourses(filteredCourses = null, searchTerm = '') {
  const container = document.getElementById('courseListContainer');
  if (!container || !window.coursesData) return;
  container.innerHTML = '';
  let courses = filteredCourses || window.coursesData;
  // Deduplicate by title if searching
  if (searchTerm) {
    const seenTitles = new Set();
    courses = courses.filter(course => {
      if (seenTitles.has(course.title)) return false;
      seenTitles.add(course.title);
      return true;
    });
  }
  // Custom logic for More:Major and More:GED view
  const validMajors = [
    'software',
    'systems',
    'data-science',
    'ict',
    'computational-theory',
    'network-communications'
  ];
  let displayCourses = courses;
  const moreSelect = document.getElementById('moreSelect');
  const trimesterSelect = document.getElementById('trimesterSelect');
  const showBtn = document.getElementById('showAllCoursesBtn');
  const seeLessBtn = document.getElementById('seeLessCoursesBtn');
  if (moreSelect && moreSelect.value === 'lab') {
    // Show only lab courses
    const labCourses = courses.filter(course => course.title.toLowerCase().includes('lab'));
    if (!showAllCourses && !searchTerm) {
      displayCourses = labCourses.slice(0, 5);
      if (showBtn) showBtn.style.display = '';
      if (seeLessBtn) seeLessBtn.style.display = 'none';
    } else {
      displayCourses = labCourses;
      if (showBtn) showBtn.style.display = 'none';
      if (seeLessBtn) seeLessBtn.style.display = '';
    }
  } else if (moreSelect && moreSelect.value === 'ged') {
    // Show only the 4 GED courses, hide buttons
    displayCourses = courses.filter(course => course.major === 'GED' && course.trimester === 'GED');
    if (showBtn) showBtn.style.display = 'none';
    if (seeLessBtn) seeLessBtn.style.display = 'none';
  } else if (moreSelect && moreSelect.value === 'major' && (!searchTerm) && trimesterSelect && trimesterSelect.value === 'all' && !showAllCourses) {
    // Show one course from each major by default
    const majorsShown = new Set();
    displayCourses = courses.filter(course => {
      if (validMajors.includes(course.major) && !majorsShown.has(course.major)) {
        majorsShown.add(course.major);
        return true;
      }
      return false;
    });
    if (showBtn) showBtn.style.display = '';
    if (seeLessBtn) seeLessBtn.style.display = 'none';
  } else if (moreSelect && moreSelect.value === 'major' && (!searchTerm) && trimesterSelect && trimesterSelect.value === 'all' && showAllCourses) {
    // Show all major courses when 'Show All Courses' is pressed
    displayCourses = courses.filter(course => validMajors.includes(course.major));
    if (showBtn) showBtn.style.display = 'none';
    if (seeLessBtn) seeLessBtn.style.display = '';
  } else if (moreSelect && moreSelect.value === 'major') {
    // Always show all major courses when searching or filtering by trimester
    displayCourses = courses.filter(course => validMajors.includes(course.major));
    if (showBtn) showBtn.style.display = 'none';
    if (seeLessBtn) seeLessBtn.style.display = '';
  } else if (!searchTerm && !showAllCourses) {
    // Default: show only first 5 courses, hide rest under button
    displayCourses = courses.slice(0, 5);
    if (showBtn) showBtn.style.display = '';
    if (seeLessBtn) seeLessBtn.style.display = 'none';
  } else if (!searchTerm && showAllCourses) {
    // Show all courses when button is pressed
    displayCourses = courses;
    if (showBtn) showBtn.style.display = 'none';
    if (seeLessBtn) seeLessBtn.style.display = '';
  } else {
    // Searching or filtering: show all filtered courses
    displayCourses = courses;
    if (showBtn) showBtn.style.display = 'none';
    if (seeLessBtn && !searchTerm) seeLessBtn.style.display = '';
  }
  displayCourses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'list-item';
    card.setAttribute('data-trimester', course.trimester);
    card.setAttribute('data-major', course.major);
    let titleHTML = course.title;
    if (searchTerm) {
      const re = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]"]/g, '\\$&')})`, 'ig');
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
    // For GED filter, show only the count of GED courses
    if (moreSelect && moreSelect.value === 'ged') {
      countEl.textContent = `${n} GED course${n!==1?'s':''}`;
    } else {
      countEl.textContent = n === total ? `${n} course${n!==1?'s':''}` : `${n} of ${total} shown`;
    }
  }

  function toggleNoResults(n) {
    const noMsg = document.getElementById('noCoursesMsg');
    if (!noMsg) return;
    noMsg.hidden = n !== 0;
  }
  setCount(displayCourses.length, window.coursesData.length);
  toggleNoResults(displayCourses.length);
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

  // List of valid majors
  const validMajors = [
    'software',
    'systems',
    'data-science',
    'ict',
    'computational-theory',
    'network-communications'
  ];

  let filtered = window.coursesData.filter(course => {
    let match = true;
    if (more === 'major') {
      // Only show courses with a valid major
      match = validMajors.includes(course.major);
      // If searching, restrict to these majors only
      if (term) {
        match = match && (
          course.title.toLowerCase().includes(term) ||
          (course.prerequisite && course.prerequisite.toLowerCase().includes(term)) ||
          (course.examDay && course.examDay.toLowerCase().includes(term)) ||
          (course.examSlot && course.examSlot.toLowerCase().includes(term))
        );
      }
      // If a specific major is selected, show only those courses
      if (advanceFilter && advanceFilter.style.display !== 'none' && major !== 'all') {
        match = match && course.major === major;
      }
    } else {
      // Always apply search term filter if present
      if (term) {
        match = match && (
          course.title.toLowerCase().includes(term) ||
          (course.prerequisite && course.prerequisite.toLowerCase().includes(term)) ||
          (course.examDay && course.examDay.toLowerCase().includes(term)) ||
          (course.examSlot && course.examSlot.toLowerCase().includes(term))
        );
      }
      // Always apply trimester filter if not 'all'
      if (trimester !== 'all') {
        const courseTrimester = String(course.trimester).trim();
        const selectedTrimester = String(trimester).trim();
        match = match && courseTrimester === selectedTrimester;
      }
      if (more === 'lab') match = match && course.title.toLowerCase().includes('lab');
      if (more === 'ged') match = match && course.major === 'GED' && String(course.trimester).toLowerCase() === 'ged';
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
  const showBtn = document.getElementById('showAllCoursesBtn');
  const seeLessBtn = document.getElementById('seeLessCoursesBtn');

  if (input) input.addEventListener('input', filterCourses);
  if (trimesterSelect) trimesterSelect.addEventListener('change', filterCourses);
  if (moreSelect) {
    moreSelect.addEventListener('change', () => {
      if (moreSelect.value === 'major' || moreSelect.value === 'fydp' || moreSelect.value === 'ged' || moreSelect.value === 'lab') {
        if (advanceFilter) advanceFilter.style.display = moreSelect.value === 'major' ? '' : 'none';
        if (trimesterSelect) trimesterSelect.value = 'all'; // Force trimester to 'all' for Major, FYDP, GED, Lab
      } else {
        if (advanceFilter) advanceFilter.style.display = 'none';
        if (advanceSelect) advanceSelect.value = 'all';
      }
      filterCourses();
    });
  }
  if (advanceSelect) advanceSelect.addEventListener('change', filterCourses);
  if (clearBtn) clearBtn.addEventListener('click', () => { input.value = ''; filterCourses(); input.focus(); });
  if (resetBtn) resetBtn.addEventListener('click', () => {
  if (input) input.value = '';
  if (trimesterSelect) trimesterSelect.value = 'all';
  if (moreSelect) moreSelect.value = 'all';
  if (advanceSelect) advanceSelect.value = 'all';
  if (advanceFilter) advanceFilter.style.display = 'none';
  showAllCourses = false;
  filterCourses();
  if (input) input.focus();
  });
  if (showBtn) {
    showBtn.addEventListener('click', () => {
      showAllCourses = true;
      renderCourses();
      if (seeLessBtn) seeLessBtn.style.display = '';
    });
  }
  if (seeLessBtn) {
    seeLessBtn.addEventListener('click', () => {
      showAllCourses = false;
      renderCourses();
      seeLessBtn.style.display = 'none';
    });
  }
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


