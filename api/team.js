export default async function handler(req, res) {
  res.status(200).json({
    summary_event_points: 58,
    captain: "Haaland",
    transfers: "1 FT",
    starters: [
      { name: "Turner", position: "GK" },
      { name: "Udogie", position: "DEF" },
      { name: "Gusto", position: "DEF" },
      { name: "Colwill", position: "DEF" },
      { name: "Eze", position: "MID" },
      { name: "Foden", position: "MID" },
      { name: "Palmer", position: "MID" },
      { name: "Gordon", position: "MID" },
      { name: "Wissa", position: "FWD" },
      { name: "Haaland", position: "FWD (C)" },
      { name: "Piroe", position: "FWD" }
    ],
    bench: [
      { name: "Areola", position: "GK" },
      { name: "Gabriel", position: "DEF" },
      { name: "Andreas", position: "MID" },
      { name: "Beyer", position: "DEF" }
    ]
  });
}
