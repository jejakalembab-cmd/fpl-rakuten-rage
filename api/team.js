const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const TEAM_ID = '2531858';
  const API_URL = `https://fantasy.premierleague.com/api/entry/${TEAM_ID}/`;

  try {
    const entryRes = await fetch(`${API_URL}`);
    const historyRes = await fetch(`${API_URL}history/`);
    const picksRes = await fetch(`${API_URL}event/${await getCurrentGW()}/picks/`);

    const entry = await entryRes.json();
    const history = await historyRes.json();
    const picks = await picksRes.json();

    const captainId = picks.picks.find(p => p.is_captain).element;
    const playerData = await fetch(`https://fantasy.premierleague.com/api/bootstrap-static/`).then(r => r.json());
    const captainName = playerData.elements.find(p => p.id === captainId)?.web_name || 'Unknown';

    const lineup = {
      starting: picks.picks.filter(p => p.position <= 11).map(p => {
        const player = playerData.elements.find(x => x.id === p.element);
        return player.web_name;
      }),
      bench: picks.picks.filter(p => p.position > 11).map(p => {
        const player = playerData.elements.find(x => x.id === p.element);
        return player.web_name;
      })
    };

    res.status(200).json({
      entry,
      captain: { id: captainId, name: captainName },
      lineup,
      current_event: await getCurrentGW()
    });
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }

  async function getCurrentGW() {
    const events = await fetch(`https://fantasy.premierleague.com/api/bootstrap-static/`).then(r => r.json());
    const gw = events.events.find(e => e.is_current);
    return gw ? gw.id : 1;
  }
};
