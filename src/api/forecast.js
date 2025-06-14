export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const APP_ID = process.env.APP_ID;

  if (!APP_ID) {
    return res.status(500).json({ error: "APP_ID not set" });
  }

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat or lon in query" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric`
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Forecast Weather API error:", error);
    res.status(500).json({ error: "Failed to fetch forecast" });
  }
}
