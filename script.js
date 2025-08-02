async function fetchTeamData() {
  const pointsEl = document.getElementById('points');
  const captainEl = document.getElementById('captain');
  const transfersEl = document.getElementById('transfers');
  const startersEl = document.getElementById('starters');
  const benchEl = document.getElementById('bench');

  pointsEl.textContent = 'Updating...';
  captainEl.textContent = 'Updating...';
  transfersEl.textContent = 'Updating...';
  startersEl.innerHTML = '';
  benchEl.innerHTML = '';

  try {
    const response = await fetch('/api/team');
    const data = await response.json();

    pointsEl.textContent = data.summary_points ?? 'N/A';
    captainEl.textContent = data.captain ?? 'N/A';
    transfersEl.textContent = data.transfers ?? 'N/A';

    data.starters.forEach(player => {
      const li = document.createElement('li');
      li.textContent = player;
      startersEl.appendChild(li);
    });

    data.bench.forEach(player => {
      const li = document.createElement('li');
      li.textContent = player;
      benchEl.appendChild(li);
    });
  } catch (error) {
    pointsEl.textContent = 'Error';
    captainEl.textContent = 'Error';
    transfersEl.textContent = 'Error';
    startersEl.innerHTML = '<li>Unable to load data</li>';
    benchEl.innerHTML = '<li>Unable to load data</li>';
  }
}

document.getElementById('refresh').addEventListener('click', fetchTeamData);
window.addEventListener('load', fetchTeamData);
