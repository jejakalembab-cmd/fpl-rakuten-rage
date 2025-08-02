export default async function handler(req, res) {
  const TEAM_ID = 2531858;

  try {
    const gwRes = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/');
    const gwData = await gwRes.json();
    const currentGw = gwData.events.find(e => e.is_current).id;

    const picksRes = await fetch(`https://fantasy.premierleague.com/api/entry/${TEAM_ID}/event/${currentGw}/picks/`);
    const picksData = await picksRes.json();

    const entryRes = await fetch(`https://fantasy.premierleague.com/api/entry/${TEAM_ID}/`);
    const entryData = await entryRes.json();

    const elementMap = {};
    gwData.elements.forEach(p => {
      elementMap[p.id] = `${p.web_name} (${gwData.teams[p.team - 1].short_name})`;
    });

    const starters = [];
    const bench = [];
    let captain = '';

    picksData.picks.forEach(p => {
      const name = elementMap[p.element] || 'Unknown';
      if (p.multiplier > 0) starters.push(name);
      else bench.push(name);
      if (p.is_captain) captain = name;
    });

    res.status(200).json({
      points: picksData.entry_history.points,
      captain,
      transfers: `${picksData.entry_history.event_transfers} (-${picksData.entry_history.event_transfers_cost})`,
      starters,
      bench
    });

  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: 'Failed to fetch team data' });
  }
}
