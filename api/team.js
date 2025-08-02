const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const TEAM_ID = 2531858;
  const EVENT_ID = 1; // Ganti ikut Gameweek semasa jika perlu
  const TEAM_URL = `https://fantasy.premierleague.com/api/entry/${TEAM_ID}/event/${EVENT_ID}/picks/`;
  const ELEMENTS_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/';

  try {
    const [teamRes, staticRes] = await Promise.all([
      fetch(TEAM_URL),
      fetch(ELEMENTS_URL)
    ]);

    const teamData = await teamRes.json();
    const staticData = await staticRes.json();

    const playersMap = {};
    staticData.elements.forEach(p => {
      playersMap[p.id] = `${p.web_name} (${staticData.teams[p.team - 1].short_name})`;
    });

    const picks = teamData.picks;
    const starters = picks.filter(p => p.position <= 11).map(p => playersMap[p.element]);
    const bench = picks.filter(p => p.position > 11).map(p => playersMap[p.element]);

    const captain = playersMap[picks.find(p => p.is_captain).element];
    const transfers = teamData.entry_history?.event_transfers ?? 'N/A';
    const points = teamData.entry_history?.points ?? 'N/A';

    res.status(200).json({
      summary_points: points,
      captain,
      transfers,
      starters,
      bench
    });
  } catch (err) {
    console.error('Error fetching FPL data:', err);
    res.status(500).json({ error: 'Failed to fetch team data' });
  }
};
