async function loadTeamData() {
  try {
    const res = await fetch('/api/team');
    const data = await res.json();

    document.getElementById("points").textContent = data.summary_event_points;
    document.getElementById("gw").textContent = data.current_event;
    document.getElementById("rank").textContent = data.last_rank;
  } catch (error) {
    console.error("Error loading team data:", error);
    document.getElementById("points").textContent = "Updating";
    document.getElementById("gw").textContent = "Updating";
    document.getElementById("rank").textContent = "Updating";
  }
}

loadTeamData();
