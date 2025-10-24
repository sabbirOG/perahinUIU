'use strict';

/**
 * MESSAGES.JS - Messages page interactions
 * Displays all messages with filtering and sorting capabilities
 */

(function() {
    loadAllMessages();
})();

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

/**
 * Load and display all messages
 */
function loadAllMessages() {
    const messagesList = document.querySelector('.list');
    const unreadBadge = document.querySelector('.badge');
    
    if (!messagesList) return;
    
    // Sort messages by timestamp (most recent first)
    const sortedMessages = messagesData.sort((a, b) => b.timestamp - a.timestamp);
    
    // Count unread messages
    const unreadCount = sortedMessages.filter(msg => msg.isNew).length;
    if (unreadBadge) {
        unreadBadge.textContent = unreadCount;
        unreadBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }
    
    // Clear existing content
    messagesList.innerHTML = '';
    
    if (sortedMessages.length === 0) {
        messagesList.innerHTML = `
            <div class="list-item muted" style="text-align: center; padding: 20px;">
                No messages available
            </div>
        `;
        return;
    }
    
    // Display all messages
    sortedMessages.forEach(msg => {
        const messageItem = document.createElement('div');
        messageItem.className = 'list-item';
        
        const badges = [];
        if (msg.isNew) badges.push('<span class="message-badge">New</span>');
        if (msg.isImportant) badges.push('<span class="message-badge important-badge">Important</span>');
        
        messageItem.innerHTML = `
            <div>
                <div class="message-sender">${msg.sender}</div>
                <div class="message-content">${msg.content}</div>
            </div>
            <div style="display: flex; gap: 6px; align-items: center;">
                ${badges.join('')}
            </div>
        `;
        
        messagesList.appendChild(messageItem);
    });
}

