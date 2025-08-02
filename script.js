const fetchTeamData = async () => {
  console.log("🔄 Refresh button clicked"); // Debug log

  // Tunjuk loading status
  document.getElementById('points').textContent = 'Updating...';
  document.getElementById('captain').textContent = 'Updating...';
  document.getElementById('transfers').textContent = 'Updating...';
  document.getElementById('starters').innerHTML = '';
  document.getElementById('bench').innerHTML = '';

  try {
    const res = await fetch('/api/team');
    const data = await res.json();

    console.log("✅ Data fetched:", data); // Debug log

    // Papar data
    document.getElementById('points').textContent = data.points;
    document.getElementById('captain').textContent = data.captain;
    document.getElementById('transfers').textContent = data.transfers;

    data.starters.forEach(player => {
      const li = document.createElement('li');
      li.textContent = player;
      document.getElementById('starters').appendChild(li);
    });

    data.bench.forEach(player => {
      const li = document.createElement('li');
      li.textContent = player;
      document.getElementById('bench').appendChild(li);
    });

  } catch (error) {
    console.error("❌ Failed to fetch team data:", error); // Debug log
    document.getElementById('points').textContent = 'Error';
    document.getElementById('captain').textContent = 'Error';
    document.getElementById('transfers').textContent = 'Error';
  }
};

// Pastikan button ada & listener aktif
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('refresh');
  if (btn) {
    btn.addEventListener('click', fetchTeamData);
    fetchTeamData(); // Auto load bila page buka
  } else {
    console.error("❗ Butang refresh tak jumpa!");
  }
});
