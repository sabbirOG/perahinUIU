'use strict';

/**
 * DASHBOARD.JS - Dashboard-specific interactions
 */

// messagesData is now loaded from js/messagesData.js. Ensure this file is included before dashboard.js in your HTML.

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
    
    // Hide badge since we're not tracking "new" anymore
    badge.style.display = 'none';
    
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
        const messageItem = document.createElement('div');
        messageItem.className = 'list-item message-item';
        
        // Format the date
        const messageDate = msg.timestamp.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
        
        messageItem.innerHTML = `
            <div style="flex: 1;">
                <div class="message-sender">${msg.sender}</div>
                <div class="message-content">${msg.content}</div>
            </div>
            <span class="muted" style="font-size: 12px; white-space: nowrap;">${messageDate}</span>
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
