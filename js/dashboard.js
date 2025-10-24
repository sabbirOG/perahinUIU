'use strict';

/**
 * DASHBOARD.JS - Dashboard-specific interactions
 */

/**
 * Messages Data Structure
 * Each message has:
 * - sender: String (who sent it)
 * - content: String (message content)
 * - timestamp: Date (when it was sent)
 * - isImportant: Boolean (marked as important)
 * - isNew: Boolean (unread status)
 */
const messagesData = [
    {
        sender: 'Dept. Office',
        content: 'Your advisor meeting is scheduled for next week.',
        timestamp: new Date('2025-10-24T10:30:00'),
        isImportant: true,
        isNew: true
    },
    {
        sender: 'Course Teacher',
        content: 'Project proposal feedback has been shared.',
        timestamp: new Date('2025-10-24T09:15:00'),
        isImportant: true,
        isNew: true
    },
    {
        sender: 'Library',
        content: 'Your book request is ready for pickup.',
        timestamp: new Date('2025-10-23T14:20:00'),
        isImportant: false,
        isNew: false
    },
    {
        sender: 'Registrar Office',
        content: 'Course registration deadline: Oct 30th.',
        timestamp: new Date('2025-10-23T11:00:00'),
        isImportant: true,
        isNew: false
    },
    {
        sender: 'Student Affairs',
        content: 'Club meeting scheduled for tomorrow.',
        timestamp: new Date('2025-10-22T16:45:00'),
        isImportant: false,
        isNew: false
    }
];

(function() {
    // Animate quick links
    document.querySelectorAll('.quick-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
    
    // Course title click navigation
    document.querySelectorAll('.card h3').forEach(title => {
        title.style.cursor = 'pointer';
        title.addEventListener('click', () => {
            window.location.href = 'pages/courses.html';
        });
    });
    
    // Load Important Messages
    loadImportantMessages();
})();

/**
 * Load and display recent messages (max 2 recent)
 */
function loadImportantMessages() {
    const messagesList = document.getElementById('importantMessagesList');
    const badge = document.getElementById('importantMessagesBadge');
    
    if (!messagesList || !badge) return;
    
    // Get all messages and sort by timestamp (most recent first)
    const recentMessages = messagesData
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 2); // Get only the 2 most recent
    
    // Count new messages (from top 2 recent)
    const newCount = recentMessages.filter(msg => msg.isNew).length;
    badge.textContent = newCount;
    badge.style.display = newCount > 0 ? 'inline-block' : 'none';
    
    // Clear loading state
    messagesList.innerHTML = '';
    
    if (recentMessages.length === 0) {
        messagesList.innerHTML = `
            <div class="list-item muted" style="text-align: center; padding: 20px;">
                No notifications at the moment
            </div>
        `;
        return;
    }
    
    // Display messages
    recentMessages.forEach(msg => {
        const timeAgo = getTimeAgo(msg.timestamp);
        const messageItem = document.createElement('div');
        messageItem.className = 'list-item message-item';
        
        messageItem.innerHTML = `
            <div style="flex: 1;">
                <div class="message-sender">${msg.sender}</div>
                <div class="message-content">${msg.content}</div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                ${msg.isNew ? '<span class="message-badge">New</span>' : ''}
                <span class="muted" style="font-size: 12px; white-space: nowrap;">${timeAgo}</span>
            </div>
        `;
        
        messagesList.appendChild(messageItem);
    });
}

/**
 * Calculate time ago from timestamp
 */
function getTimeAgo(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
