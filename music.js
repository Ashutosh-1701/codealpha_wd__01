let playlist = [];
let currentTrackIndex = 0;
const audioPlayer = document.getElementById('audioPlayer');
const playlistElement = document.getElementById('playlist');
const fileInput = document.getElementById('fileInput');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const volumeControl = document.getElementById('volumeControl');

// Handle file upload
fileInput.addEventListener('change', e => {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    playlist.push({ name: file.name, file, url: URL.createObjectURL(file) });
  });
  renderPlaylist();
});

// Render playlist
function renderPlaylist(filter = '') {
  playlistElement.innerHTML = '';
  playlist
    .filter(track => track.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((track, index) => {
      const li = document.createElement('li');
      li.textContent = track.name;
      li.className = (index === currentTrackIndex) ? 'active' : '';
      li.onclick = () => { loadTrack(index); playTrack(); };
      playlistElement.appendChild(li);
    });
}

// Load track
function loadTrack(index) {
  currentTrackIndex = index;
  audioPlayer.src = playlist[index].url;
  renderPlaylist(searchInput.value);
}

// Play/pause toggle
function togglePlay() {
  if (audioPlayer.paused) {
    playTrack();
  } else {
    audioPlayer.pause();
  }
}

function playTrack() {
  if (!playlist.length) return;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  playTrack();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  playTrack();
}

// Search filter
searchInput.addEventListener('input', e => {
  renderPlaylist(e.target.value);
});

// Volume control
volumeControl.addEventListener('input', e => {
  audioPlayer.volume = e.target.value;
});

// Dark/Light mode toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
