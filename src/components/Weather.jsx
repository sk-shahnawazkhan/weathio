import React, { useEffect, useState } from "react";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    getWeatherDetails("Mecca");
  }, []);

  const APP_ID = import.meta.env.VITE_APP_ID;

  const getWeatherDetails = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APP_ID}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      setSearch("");
      setIsButtonDisabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    setIsButtonDisabled(event.target.value.length === 0);
  };

  const handleSearch = async () => {
    getWeatherDetails(search);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-bl from-sky-300 to-purple-200">
      <div className="p-10 w-full md:w-1/2 xl:w-1/3 bg-gradient-to-r from-sky-300 via-indigo-300 to-blue-300 bg-stone-100 rounded-xl">
        <div className="flex items-center justify-center gap-1">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search city or your place"
            className="w-full h-15 text-xl border-1 border-slate-500 p-2 rounded-lg bg-white"
            value={search}
            onChange={handleChange}
          />
          <button
            className={`py-1 px-4 h-15 text-xl border-1 border-slate-500 rounded-lg bg-white text-sky-500 ${
              isButtonDisabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            onClick={handleSearch}
            disabled={isButtonDisabled}
          >
            Search
          </button>
        </div>
        <div className="mt-5">
          <p className="text-5xl font-bold text-center">
            {weatherData?.main?.temp}°c
          </p>
          <p className="text-center font-semibold mt-2">
            {weatherData?.name}
            <span>, {weatherData?.sys?.country}</span>
          </p>
          <div className="mt-5 flex items-center justify-center gap-5">
            <img
              src={
                weatherData && weatherData.weather && weatherData.weather[0]
                  ? `https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`
                  : ""
              }
              alt=""
              className="size-30"
            />
            <p className="capitalize">
              {weatherData && weatherData.weather && weatherData.weather[0]
                ? weatherData.weather[0].description
                : ""}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p>Humidity: {weatherData?.main?.humidity}%</p>
            <p>Wind Speed: {weatherData?.wind?.speed} km/h</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Weather;
