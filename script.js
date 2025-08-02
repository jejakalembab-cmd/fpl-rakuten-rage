const refreshBtn = document.getElementById('refreshBtn');
const statusEl = document.getElementById('status');

const fetchTeamData = async () => {
  statusEl.textContent = "Updating...";
  try {
    const response = await fetch('/api/team');
    const data = await response.json();

    document.getElementById('gameweek').textContent = `Gameweek: ${data.current_event}`;
    document.getElementById('points').textContent = `Points: ${data.entry.history.total_points}`;
    document.getElementById('captain').textContent = `Captain: ${data.captain.name}`;
    document.getElementById('transfers').textContent = `Transfers: ${data.entry.history.event_transfers}`;
    document.getElementById('lineup').textContent = `Starters: ${data.lineup.starting.join(", ")}`;
    document.getElementById('bench').textContent = `Bench: ${data.lineup.bench.join(", ")}`;
    document.getElementById('chips').textContent = `Active Chip: ${data.entry.history.chip}`;
    document.getElementById('rankValue').textContent = `Rank: ${data.entry.summary_overall_rank}, Value: £${data.entry.last_deadline_value / 10}m`;

    statusEl.textContent = "Updated";
  } catch (error) {
    statusEl.textContent = "Updating..."; // fallback, no error message
  }
};

refreshBtn.addEventListener('click', fetchTeamData);

// Auto-fetch on load
fetchTeamData();
