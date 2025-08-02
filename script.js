async function loadTeamData() {
  try {
    const res = await fetch('/api/team');
    const data = await res.json();

    document.getElementById('points').textContent = data.summary_event_points ?? 'Unavailable';
    document.getElementById('captain').textContent = data.captain ?? 'Unavailable';
    document.getElementById('transfers').textContent = data.transfers ?? 'Unavailable';

    const starters = document.getElementById('starters');
    const bench = document.getElementById('bench');

    starters.innerHTML = '';
    bench.innerHTML = '';

    data.starters?.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name} (${p.position})`;
      starters.appendChild(li);
    });

    data.bench?.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name} (${p.position})`;
      bench.appendChild(li);
    });

  } catch (err) {
    document.getElementById('points').textContent = 'Updating';
    document.getElementById('captain').textContent = 'Updating';
    document.getElementById('transfers').textContent = 'Updating';
  }
}

loadTeamData();
