export default async function handler(req, res) {
  //     const url = new URL(req.url);
  //   const location = url.searchParams.get("location");
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: "location are required" });
  }

  const APP_ID = process.env.CURRENT_WEATHER_API_ID;
  let url = "";

  //   if (type === "current") {
  //     url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APP_ID}&units=metric`;
  //   } else if (type === "forecast") {
  //     url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APP_ID}&units=metric`;
  //   } else {
  //     return res
  //       .status(400)
  //       .json({ error: "Invalid type. Use 'current' or 'forecast'." });
  //   }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APP_ID}&units=metric`
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
