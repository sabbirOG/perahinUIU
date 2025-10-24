'use strict';

/**
 * MESSAGES.JS - Messages page interactions
 * Displays all messages with filtering and sorting capabilities
 */

/**
 * Messages Data Structure
 * Each message has:
 * - sender: String (who sent it)
 * - content: String (message content)
 * - timestamp: Date (when it was sent)
 * - isImportant: Boolean (marked as important)
 */
const messagesData = [
    {
        sender: 'Dept. Office',
        content: 'Section selection and registration are tentatively scheduled for the first week of November, following the final exams.',
        timestamp: new Date('2025-10-24T10:30:00'),
        isImportant: true
    },
    {
        sender: 'Registrar Office',
        content: 'Course registration deadline: Oct 30th.',
        timestamp: new Date('2025-10-23T11:00:00'),
        isImportant: true
    },
    {
        sender: 'UIU',
        content: "UIU Project Show Summer '25 update: The result ceremony will be on 17 Nov 2025.",
        timestamp: new Date('2025-10-23T09:00:00'),
        isImportant: false
    },
    {
        sender: 'Registrar Office',
        content: 'Final exams start on 25 Oct 2025.',
        timestamp: new Date('2025-10-16T09:00:00'),
        isImportant: false
    }
];

/**
 * Utilities
 */
const norm = s => (s || '').toLowerCase().trim();

/** Render list to DOM */
function renderMessages(targetEl, list) {
    if (!targetEl) return;
    targetEl.innerHTML = '';

    if (!list || list.length === 0) {
        targetEl.innerHTML = `
            <div class="list-item muted" style="text-align: center; padding: 20px;">
                No messages available
            </div>
        `;
        return;
    }

    list.forEach(msg => {
        const messageItem = document.createElement('div');
        messageItem.className = 'list-item';
        if (msg.isImportant) messageItem.classList.add('important');

        const publishDate = msg.timestamp.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        const badges = [];
        if (msg.isImportant) badges.push('<span class="message-badge important-badge">Important</span>');

        messageItem.innerHTML = `
            <div>
                <div class="message-sender">${msg.sender}</div>
                <div class="message-content">${msg.content}</div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
                ${badges.join('')}
                <span class="muted" style="font-size: 12px; white-space: nowrap;">${publishDate}</span>
            </div>
        `;
        targetEl.appendChild(messageItem);
    });
}

/** Initialize page: wire filters and render */
function initMessages() {
    const messagesList = document.getElementById('messagesList') || document.querySelector('.list');
    if (!messagesList) return;

    const unreadBadge = document.querySelector('h2 .badge');
    if (unreadBadge) unreadBadge.style.display = 'none';

    const q = document.getElementById('messageSearch');
    const cat = document.getElementById('messageCategory');
    const dt = document.getElementById('messageDate');

    // Pre-sort once (most recent first)
    const base = [...messagesData].sort((a, b) => b.timestamp - a.timestamp);

    function apply() {
        const term = norm(q && q.value);
        const category = cat ? cat.value : 'all';
        const date = dt ? dt.value : 'all';

        const filtered = base.filter(m => {
            let ok = true;
            if (term) {
                const text = `${m.sender} ${m.content}`.toLowerCase();
                if (!text.includes(term)) ok = false;
            }
            if (ok && category !== 'all') {
                if (category === 'important' && !m.isImportant) ok = false;
                if (category === 'general' && m.isImportant) ok = false;
            }
            if (ok && date !== 'all') {
                const ym = `${m.timestamp.getFullYear()}-${String(m.timestamp.getMonth()+1).padStart(2,'0')}`;
                if (!ym.startsWith(date)) ok = false;
            }
            return ok;
        });

        renderMessages(messagesList, filtered);
    }

    [q, cat, dt].forEach(ctrl => ctrl && ctrl.addEventListener('input', apply));
    [cat, dt].forEach(ctrl => ctrl && ctrl.addEventListener('change', apply));
    apply();
}

// Ensure DOM is ready before initializing
window.addEventListener('DOMContentLoaded', initMessages);

