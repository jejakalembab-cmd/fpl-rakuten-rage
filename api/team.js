export default async function handler(req, res) {
  const TEAM_ID = 2531858;
  const BASE_URL = 'https://fantasy.premierleague.com/api';

  try {
    // Fetch bootstrap data to get current gameweek
    const bootstrapRes = await fetch(`${BASE_URL}/bootstrap-static/`);
    const bootstrap = await bootstrapRes.json();

    const currentEvent = bootstrap.events.find(e => e.is_current);
    if (!currentEvent) {
      return res.status(500).json({ error: "Current Gameweek not found." });
    }

    const [entryRes, picksRes] = await Promise.all([
      fetch(`${BASE_URL}/entry/${TEAM_ID}/`),
      fetch(`${BASE_URL}/entry/${TEAM_ID}/event/${currentEvent.id}/picks/`)
    ]);

    const entry = await entryRes.json();
    const picks = await picksRes.json();

    const elements = bootstrap.elements;
    const teams = bootstrap.teams;

    const getPlayerData = (id) => {
      const player = elements.find(p => p.id === id);
      const team = teams.find(t => t.id === player.team);
      return {
        name: `${player.web_name}`,
        position: getPosition(player.element_type),
        team: team.name
      };
    };

    const getPosition = (type) => {
      switch (type) {
        case 1: return 'GK';
        case 2: return 'DEF';
        case 3: return 'MID';
        case 4: return 'FWD';
        default: return '';
      }
    };

    const starting = [];
    const bench = [];
    let captainName = "Unknown";

    picks.picks.forEach(p => {
      const playerData = getPlayerData(p.element);
      if (p.multiplier > 0) {
        starting.push(playerData);
      } else {
        bench.push(playerData);
      }
      if (p.is_captain) {
        captainName = playerData.name;
      }
    });

    res.status(200).json({
      gameweek: currentEvent.id,
      summary_event_points: entry.summary_event_points,
      captain: captainName,
      transfers: `Used ${entry.last_deadline_total_transfers} transfers`,
      starting,
      bench
    });

  } catch (err) {
    console.error("Error fetching FPL data:", err);
    res.status(500).json({ error: "Failed to load FPL data." });
  }
}
