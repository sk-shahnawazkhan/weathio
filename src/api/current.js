export default async function handler(req, res) {
  const location = req.query.location;
  const APP_ID = process.env.APP_ID;

  if (!APP_ID) {
    return res.status(500).json({ error: "API_ID not set" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APP_ID}&units=metric`
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Current Weather API error:", error);
    res.status(500).json({ error: "Failed to fetch current weather" });
  }
}
