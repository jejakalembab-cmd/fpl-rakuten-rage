async function fetchTeamData() {
  try {
    const res = await fetch('/api/team');
    const data = await res.json();

    document.getElementById('points').textContent = data.points ?? 'Unavailable';
    document.getElementById('captain').textContent = data.captain ?? 'Unavailable';
    document.getElementById('transfers').textContent = data.transfers ?? 'Unavailable';

    const startingList = document.getElementById('starting');
    startingList.innerHTML = '';
    data.starting.forEach(player => {
      const li = document.createElement('li');
      li.textContent = player;
      startingList.appendChild(li);
    });

    const benchList = document.getElementById('bench');
    benchList.innerHTML = '';
    data.bench.forEach(player => {
      const li = document.createElement('li');
      li.textContent = player;
      benchList.appendChild(li);
    });

  } catch (err) {
    document.getElementById('points').textContent = 'Error';
    document.getElementById('captain').textContent = 'Error';
    document.getElementById('transfers').textContent = 'Error';
    document.getElementById('starting').innerHTML = '<li>Unable to load data</li>';
    document.getElementById('bench').innerHTML = '<li>Unable to load data</li>';
  }
}

document.getElementById('refresh').addEventListener('click', fetchTeamData);

// Auto-fetch on page load
fetchTeamData();
