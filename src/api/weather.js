export default async function handler(req, res) {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: "location parameter is required" });
  }

  const APP_ID = process.env.CURRENT_WEATHER_API_ID;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APP_ID}&units=metric`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
