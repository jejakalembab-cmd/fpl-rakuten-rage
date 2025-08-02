// api/team.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const TEAM_ID = 2531858;
  const BASE_URL = 'https://fantasy.premierleague.com/api';

  try {
    // Step 1: Get current event (gameweek)
    const bootstrapRes = await fetch(`${BASE_URL}/bootstrap-static/`);
    const bootstrapData = await bootstrapRes.json();
    const currentEvent = bootstrapData.events.find(e => e.is_current)?.id;

    if (!currentEvent) throw new Error('Current gameweek not found');

    // Step 2: Get entry data
    const teamRes = await fetch(`${BASE_URL}/entry/${TEAM_ID}/event/${currentEvent}/picks/`);
    const teamData = await teamRes.json();

    // Step 3: Get player details
    const playerRes = await fetch(`${BASE_URL}/element-summary/${teamData.entry_history?.entry ?? TEAM_ID}/`);
    const playerData = await playerRes.json();

    const allPlayers = bootstrapData.elements;
    const picks = teamData.picks || [];

    const starters = [];
    const bench = [];

    picks.forEach(pick => {
      const player = allPlayers.find(p => p.id === pick.element);
      const playerName = `${player.web_name} (${player.team_code})`;

      const playerInfo = {
        name: playerName,
        position: pick.position,
        isCaptain: pick.is_captain,
      };

      if (pick.position <= 11) {
        starters.push(playerInfo);
      } else {
        bench.push(playerInfo);
      }
    });

    const captainPick = starters.find(p => p.isCaptain);
    const captain = captainPick ? captainPick.name : 'Unknown';

    res.status(200).json({
      points: teamData.entry_history.total_points ?? 0,
      captain,
      transfers: teamData.entry_history.event_transfers ?? 0,
      starters,
      bench
    });

  } catch (error) {
    console.error('Fetch team data error:', error.message);
    res.status(500).json({ error: 'Failed to fetch team data' });
  }
      }
