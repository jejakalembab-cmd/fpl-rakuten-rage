export default async function handler(req, res) {
  const teamId = 2531858;
  const teamURL = `https://fantasy.premierleague.com/api/entry/${teamId}/event/1/picks/`;
  const playerURL = `https://fantasy.premierleague.com/api/bootstrap-static/`;

  try {
    const [teamRes, playerRes] = await Promise.all([
      fetch(teamURL),
      fetch(playerURL)
    ]);

    const teamData = await teamRes.json();
    const playerData = await playerRes.json();

    const playerMap = {};
    playerData.elements.forEach(p => {
      playerMap[p.id] = { name: `${p.first_name} ${p.second_name}` };
    });

    const picks = teamData.picks || [];

    const startingPlayers = picks.filter(p => p.multiplier > 0);
    const benchPlayers = picks.filter(p => p.multiplier === 0);

    const captain = picks.find(p => p.is_captain);
    const viceCaptain = picks.find(p => p.is_vice_captain);

    res.status(200).json({
      points: teamData.entry_history?.points,
      transfers: teamData.entry_history?.event_transfers,
      startingPlayers: startingPlayers.map(p => playerMap[p.element]),
      benchPlayers: benchPlayers.map(p => playerMap[p.element]),
      captain: playerMap[captain?.element],
      viceCaptain: playerMap[viceCaptain?.element]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch team data.' });
  }
}
