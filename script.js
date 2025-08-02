// script.js

const pointsEl = document.getElementById('points');
const captainEl = document.getElementById('captain');
const transfersEl = document.getElementById('transfers');
const startersEl = document.getElementById('starters');
const benchEl = document.getElementById('bench');
const refreshBtn = document.getElementById('refresh');

const fetchTeamData = async () => {
  pointsEl.textContent = 'Updating...';
  captainEl.textContent = 'Updating...';
  transfersEl.textContent = 'Updating...';
  startersEl.innerHTML = '';
  benchEl.innerHTML = '';

  try {
    const res = await fetch('/api/team');
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    pointsEl.textContent = data.points;
    captainEl.textContent = data.captain;
    transfersEl.textContent = data.transfers;

    data.starters.forEach(player => {
      const li = document.createElement('li');
      li.textContent = player.name + (player.isCaptain ? ' (C)' : '');
      startersEl.appendChild(li);
    });

    data.bench.forEach(player => {
      const li = document.createElement('li');
      li.textContent = player.name;
      benchEl.appendChild(li);
    });

  } catch (error) {
    console.error('Fetch failed:', error);
    pointsEl.textContent = 'Error';
    captainEl.textContent = 'Error';
    transfersEl.textContent = 'Error';
  }
};

// Event: manual refresh
if (refreshBtn) {
  refreshBtn.addEventListener('click', fetchTeamData);
}

// Auto run once on load
fetchTeamData();

// Live update every 60 seconds
setInterval(fetchTeamData, 60000); // 60000 ms = 60s
