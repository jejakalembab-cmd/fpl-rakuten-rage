export default async function handler(req, res) {
  const teamId = "2531858";
  const response = await fetch(`https://fantasy.premierleague.com/api/entry/${teamId}/`);
  const data = await response.json();
  res.status(200).json({
    name: data.name,
    summary_event_points: data.summary_event_points,
    current_event: data.current_event,
    last_rank: data.last_rank,
  });
}
