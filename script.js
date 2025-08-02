const pointsEl = document.getElementById('points');
const captainEl = document.getElementById('captain');
const transfersEl = document.getElementById('transfers');
const startersEl = document.getElementById('starters');
const benchEl = document.getElementById('bench');
const refreshBtn = document.getElementById('refreshBtn');

// Fungsi utama fetch data
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

  } catch (err) {
    pointsEl.textContent = 'Belum Sedia';
    captainEl.textContent = 'Belum Sedia';
    transfersEl.textContent = 'Belum Sedia';
    console.error('Failed to fetch team data:', err);
  }
};

// Tambah fungsi ke butang refresh
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    console.log('Refresh button clicked');
    fetchTeamData();
  });
}

// Auto-fetch on page load
window.addEventListener('DOMContentLoaded', fetchTeamData);
