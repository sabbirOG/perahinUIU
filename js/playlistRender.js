// playlistRender.js
// Dynamically render playlist cards from playlistData.js (now using playlists array)

import { playlists } from './playlistData.js';

document.addEventListener('DOMContentLoaded', function() {
  const list = document.getElementById('playlistList');
  const searchInput = document.getElementById('playlistSearch');
  const trimesterSelect = document.getElementById('trimesterSelect');
  const countEl = document.getElementById('playlistSearchCount');
  const clearBtn = document.getElementById('playlistSearchClear');
  const noMsg = document.getElementById('noPlaylistsMsg');

  function normalize(s) {
    return (s || '').toLowerCase().trim();
  }

  function render(filtered) {
    list.innerHTML = '';
    let visible = 0;
    filtered.forEach(pl => {
      const item = document.createElement('div');
      item.className = 'list-item';
      item.setAttribute('data-course', pl.code);
      item.setAttribute('data-trimester', pl.trimester);
      item.innerHTML = `
        <div>
          <div class="course-title" style="font-weight:600;">${pl.code} · ${pl.name}</div>
          <div class="muted">${pl.by ? 'Playlist | ' + pl.by : 'YouTube Playlist Available'}</div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <a class="btn playlist-btn" href="${pl.url}" target="_blank" rel="noopener">Go</a>
        </div>
      `;
      list.appendChild(item);
      visible++;
    });
    if (countEl) countEl.textContent = `${visible} playlist${visible !== 1 ? 's' : ''}`;
    if (noMsg) noMsg.hidden = visible > 0;
  }

  function filterPlaylists() {
    const q = normalize(searchInput.value);
    const trimester = trimesterSelect ? trimesterSelect.value : 'all';
    let filtered = playlists.filter(pl => {
      const matchText = `${pl.code} ${pl.name}`.toLowerCase();
      const searchMatch = !q || matchText.includes(q);
      const trimesterMatch = trimester === 'all' || String(pl.trimester) === String(trimester);
      return searchMatch && trimesterMatch;
    });
    render(filtered);
    if (clearBtn) clearBtn.classList.toggle('show', !!q);
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterPlaylists);
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        filterPlaylists();
        searchInput.blur();
      }
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      searchInput.value = '';
      filterPlaylists();
      searchInput.focus();
    });
  }
  if (trimesterSelect) {
    trimesterSelect.addEventListener('change', filterPlaylists);
  }

  // Initial render
  filterPlaylists();
});
