const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const TEAM_ID = 2531858;
  const FPL_API = `https://fantasy.premierleague.com/api/my-team/${TEAM_ID}/`;
  const ENTRY_API = `https://fantasy.premierleague.com/api/entry/${TEAM_ID}/`;

  try {
    const [teamRes, entryRes] = await Promise.all([
      fetch(FPL_API),
      fetch(ENTRY_API)
    ]);

    const teamData = await teamRes.json();
    const entryData = await entryRes.json();

    const starting = [];
    const bench = [];

    const picks = teamData.picks;
    for (const pick of picks) {
      const elementId = pick.element;
      const isCaptain = pick.is_captain;

      const playerRes = await fetch(`https://fantasy.premierleague.com/api/element-summary/${elementId}/`);
      const playerData = await playerRes.json();

      const playerName = playerData.history[0]?.web_name || 'Unknown';

      if (pick.position <= 11) {
        starting.push(isCaptain ? `${playerName} (C)` : playerName);
      } else {
        bench.push(playerName);
      }
    }

    const points = teamData.entry_history?.points || null;
    const transfers = teamData.entry_history?.event_transfers || 0;
    const captain = starting.find(p => p.includes('(C)')) || 'Unavailable';

    res.status(200).json({ points, captain, transfers, starting, bench });

  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch team data' });
  }
};
