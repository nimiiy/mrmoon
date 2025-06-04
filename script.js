let selectedTile = 'vitamin-taken';
const tileImages = {
  'vitamin-taken': 'tiles/yes.png',
  'vitamin-missed': 'tiles/no.png'
};

const calendar = document.getElementById('calendar');
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();

// Create calendar
for (let d = 1; d <= daysInMonth; d++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.day = d;
  cell.onclick = () => placeTile(cell);

  const dayLabel = document.createElement('span');
  dayLabel.classList.add('day-number');
  dayLabel.textContent = d;

  cell.appendChild(dayLabel);
  calendar.appendChild(cell);
}

function selectTile(tile) {
  selectedTile = tile;
}

function placeTile(cell) {
  cell.style.backgroundImage = `url(${tileImages[selectedTile]})`;
  cell.style.backgroundSize = 'cover';
}

function saveMap() {
  const data = Array.from(document.querySelectorAll('.cell')).map(cell => cell.style.backgroundImage);
  localStorage.setItem(`vitaminMap-${year}-${month}`, JSON.stringify(data));
  alert('Tracking saved!');
}

function loadMap() {
  const data = JSON.parse(localStorage.getItem(`vitaminMap-${year}-${month}`));
  if (!data) return;
  document.querySelectorAll('.cell').forEach((cell, i) => {
    cell.style.backgroundImage = data[i];
    cell.style.backgroundSize = 'cover';
  });
}

function saveNotes() {
  const notes = document.getElementById('topic-notes').value;
  localStorage.setItem('topicNotes', notes);
  alert('Notes saved.');
}

window.onload = () => {
  loadMap();
  const savedNotes = localStorage.getItem('topicNotes');
  if (savedNotes) document.getElementById('topic-notes').value = savedNotes;
};

