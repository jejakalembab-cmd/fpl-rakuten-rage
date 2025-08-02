const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const teamId = 2531858;
    const response = await fetch(`https://fantasy.premierleague.com/api/entry/${teamId}/event/1/picks/`);
    const data = await response.json();

    const bootstrap = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
    const bootstrapData = await bootstrap.json();
    const players = bootstrapData.elements;

    const starting_xi = [];
    const bench = [];
    let captain = "";
    
    data.picks.forEach(pick => {
      const player = players.find(p => p.id === pick.element);
      const playerInfo = {
        name: `${player.first_name} ${player.second_name}`,
        position: bootstrapData.element_types.find(t => t.id === player.element_type).singular_name
      };

      if (pick.multiplier > 0) {
        starting_xi.push(playerInfo);
      } else {
        bench.push(playerInfo);
      }

      if (pick.is_captain) {
        captain = playerInfo.name;
      }
    });

    res.status(200).json({
      points: data.entry_history?.points || 'Updating...',
      captain,
      transfers: data.entry_history?.event_transfers || '0',
      starting_xi,
      bench
    });

  } catch (err) {
    res.status(500).json({ error: "Unable to fetch team data" });
  }
};
