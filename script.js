document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/team')
    .then(res => res.json())
    .then(data => {
      document.getElementById("points").textContent = data.points || 'N/A';
      document.getElementById("captain").textContent = data.captain || 'N/A';
      document.getElementById("transfers").textContent = data.transfers || 'N/A';

      const startingXI = document.getElementById("starting-xi");
      const bench = document.getElementById("bench");

      startingXI.innerHTML = '';
      data.starting_xi.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name} (${player.position})`;
        startingXI.appendChild(li);
      });

      bench.innerHTML = '';
      data.bench.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name} (${player.position})`;
        bench.appendChild(li);
      });
    })
    .catch(() => {
      document.getElementById("points").textContent = 'Error';
      document.getElementById("captain").textContent = 'Error';
      document.getElementById("transfers").textContent = 'Error';
      document.getElementById("starting-xi").textContent = 'Unable to load data';
      document.getElementById("bench").textContent = 'Unable to load data';
    });
});
