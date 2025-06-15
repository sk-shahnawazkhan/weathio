export default async function handler(req, res) {
  const city = req.query.city;
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key is not available!" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json(); //PARSING response from OpenWeatherMap API into a usable JavaScript object
    res.status(200).json(data); //Sending json/data to frontend into JSON string text-based format
  } catch (error) {
    console.error("Current Weather API error:", error);
    res.status(500).json({ error: "Failed to fetch current weather" });
  }
}
