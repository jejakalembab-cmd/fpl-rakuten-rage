async function fetchData() {
  try {
    const res = await fetch("/api/team");
    const data = await res.json();

    // Gameweek summary
    document.getElementById("points").textContent = data.summary_event_points || "N/A";
    document.getElementById("captain").textContent = data.captain || "N/A";
    document.getElementById("transfers").textContent = data.transfers || "N/A";

    // Starting XI
    const startingUl = document.getElementById("starting-players");
    startingUl.innerHTML = "";
    data.starting.forEach(player => {
      const li = document.createElement("li");
      li.textContent = `${player.name} (${player.position}) - ${player.team}`;
      startingUl.appendChild(li);
    });

    // Bench
    const benchUl = document.getElementById("bench-players");
    benchUl.innerHTML = "";
    data.bench.forEach(player => {
      const li = document.createElement("li");
      li.textContent = `${player.name} (${player.position}) - ${player.team}`;
      benchUl.appendChild(li);
    });

  } catch (err) {
    document.getElementById("points").textContent = "Error";
    document.getElementById("captain").textContent = "Error";
    document.getElementById("transfers").textContent = "Error";
    document.getElementById("starting-players").innerHTML = "<li>Unable to load data</li>";
    document.getElementById("bench-players").innerHTML = "<li>Unable to load data</li>";
  }
}

// Auto-fetch on load
fetchData();

// Refresh button
document.getElementById("refresh-btn").addEventListener("click", fetchData);
