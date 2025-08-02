fetch('/api/team')
  .then(res => res.json())
  .then(data => {
    document.getElementById("points").innerText = data.points ?? "N/A";
    document.getElementById("captain").innerText = data.captain?.name ?? "N/A";
    document.getElementById("transfers").innerText = data.transfers ?? "N/A";

    document.getElementById("captain-name").innerText = data.captain?.name ?? "-";
    document.getElementById("vice-name").innerText = data.viceCaptain?.name ?? "-";

    data.startingPlayers.forEach(player => {
      const li = document.createElement("li");
      li.textContent = player.name;
      document.getElementById("starting-list").appendChild(li);
    });

    data.benchPlayers.forEach(player => {
      const li = document.createElement("li");
      li.textContent = player.name;
      document.getElementById("bench-list").appendChild(li);
    });
  })
  .catch(err => {
    console.error('Error loading team data:', err);
  });
