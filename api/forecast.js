export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key is not available!" });
  }

  if (!lat || !lon) {
    return res.status(400).json({ error: "lat or lon is missing" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Forecast Weather API error:", error);
    res.status(500).json({ error: "Failed to fetch forecast" });
  }
}
