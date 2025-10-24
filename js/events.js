
// Minimal filtering for Events page (original static version)
(function() {
    const q = document.getElementById('eventSearch');
    const type = document.getElementById('eventType');
    const month = document.getElementById('eventMonth');
    const list = document.getElementById('eventsList');
    const calendar = document.querySelector('.event-calendar');
    if (!list || !calendar) return;

    let items = Array.from(list.querySelectorAll('.list-item'));

    // Helper: parse event date from .event-meta text (returns JS Date or null)
    function parseEventDate(el) {
        const meta = el.querySelector('.event-meta');
        if (!meta) return null;
        // Try to match e.g. 'Wed Oct 22, 2025' or 'Mon Oct 20, 2025'
        const match = meta.textContent.match(/([A-Za-z]{3}) ([A-Za-z]{3}) (\d{1,2}), (\d{4})/);
        if (match) {
            // e.g. 'Oct 22, 2025'
            return new Date(`${match[2]} ${match[3]}, ${match[4]}`);
        }
        // Try to match range: 'Tue-Wed Oct 14-15, 2025'
        const rangeMatch = meta.textContent.match(/([A-Za-z]{3})-([A-Za-z]{3}) ([A-Za-z]{3}) (\d{1,2})-(\d{1,2}), (\d{4})/);
        if (rangeMatch) {
            // Use the latest day in the range for sorting
            return new Date(`${rangeMatch[3]} ${rangeMatch[5]}, ${rangeMatch[6]}`);
        }
        return null;
    }

    // Sort items by date descending (most recent/top)
    function sortItems() {
        items.sort((a, b) => {
            const da = parseEventDate(a);
            const db = parseEventDate(b);
            if (!da && !db) return 0;
            if (!da) return 1;
            if (!db) return -1;
            return db - da;
        });
        // Re-append in sorted order
        items.forEach(el => list.appendChild(el));
    }
    const norm = s => (s || '').toLowerCase().trim();

    // Highlight calendar days with events and enable filtering by day
    let activeDay = null;
    function highlightCalendar() {
        // Collect event days for the current month
        const eventDays = new Set();
        const dayToEvent = {};
        items.forEach(el => {
            const meta = el.querySelector('.event-meta');
            if (meta) {
                // Try to extract the day from the event-meta text (e.g., 'Wed Oct 22, 2025')
                const match = meta.textContent.match(/\b([A-Za-z]{3}) ([A-Za-z]{3}) (\d{1,2}), (\d{4})/);
                if (match) {
                    const day = parseInt(match[3], 10);
                    eventDays.add(day);
                    if (!dayToEvent[day]) dayToEvent[day] = [];
                    dayToEvent[day].push(el);
                }
            }
        });
        // Highlight calendar days
        calendar.querySelectorAll('.calendar-day').forEach(dayEl => {
            const dayNum = parseInt(dayEl.textContent, 10);
            if (eventDays.has(dayNum)) {
                dayEl.classList.add('event');
            } else {
                dayEl.classList.remove('event');
            }
            // Add click handler for filtering and effect
            dayEl.onclick = eventDays.has(dayNum) ? function() {
                // Click effect: add .clicked class, remove after animation
                dayEl.classList.remove('clicked');
                void dayEl.offsetWidth; // force reflow for retrigger
                dayEl.classList.add('clicked');
                setTimeout(() => dayEl.classList.remove('clicked'), 250);

                if (activeDay === dayNum) {
                    // Reset filter
                    activeDay = null;
                    apply();
                } else {
                    activeDay = dayNum;
                    items.forEach(el => el.style.display = 'none');
                    (dayToEvent[dayNum] || []).forEach(el => el.style.display = '');
                    // Visually indicate active day
                    calendar.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
                    dayEl.classList.add('active');
                }
            } : null;
            if (!eventDays.has(dayNum)) dayEl.classList.remove('active');
            if (activeDay !== dayNum) dayEl.classList.remove('active');
        });
        // If no day is active, clear all .active
        if (!activeDay) calendar.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
    }

    function apply() {
        const term = norm(q && q.value);
        const t = type ? type.value : 'all';
        const m = month ? month.value : 'all';

        // If a calendar day is active, only show those events
        if (activeDay) {
            highlightCalendar();
            return;
        }

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
        sortItems();
        highlightCalendar();
    }

    [q, type, month].forEach(ctrl => ctrl && ctrl.addEventListener('input', apply));
    [type, month].forEach(ctrl => ctrl && ctrl.addEventListener('change', apply));
    sortItems();
    highlightCalendar();
    apply();
})();


