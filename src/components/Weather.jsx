import React, { useEffect, useState } from "react";
import { convertUnixToLocalTime } from "../utils/dateTime";
import Map from "./Map";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [noRecords, setNoRecords] = useState(false);

  useEffect(() => {
    getWeatherDetails("Moradabad");
  }, []);

  const APP_ID = import.meta.env.VITE_APP_ID;

  const getWeatherDetails = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APP_ID}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setSearch("");
        setIsButtonDisabled(true);
        setHasError(false);
        setNoRecords(false);
      } else {
        setNoRecords(true);
      }
    } catch (error) {
      console.log(error);
      setHasError(true);
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
    <main className="min-h-screen bg-linear-to-bl from-sky-300 to-purple-200">
      <section className="px-10 lg:px-20 xl:px-40 pt-10 pb-5">
        <div className="flex items-center justify-center gap-1">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Type place name..."
            className="w-full sm:max-w-2/3 lg:max-w-1/2 h-15 text-center text-xl placeholder:text-gray-500 placeholder:italic placeholder:text-center border-1 border-slate-500 p-2 rounded-lg bg-slate-100"
            value={search}
            onChange={handleChange}
          />
          <button
            className={`py-1 px-4 h-15 text-xl border-1 border-slate-500 rounded-lg bg-slate-100 text-sky-500 ${
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
      </section>
      <section className="px-10 lg:px-20 min-xl:px-40 py-5 weather-report">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {weatherData && !noRecords && !hasError && (
            <>
              <div className="shadow-lg">
                <div className="p-5 bg-gradient-to-l from-sky-300 via-indigo-200 to-blue-200">
                  {weatherData.name && (
                    <h2 className="text-xl text-slate-500 font-semibold">
                      {weatherData?.name === "Morādābād"
                        ? "Moradabad"
                        : weatherData?.name}
                      , {weatherData?.sys?.country} |{" "}
                      <span className="text-base">
                        {convertUnixToLocalTime(
                          weatherData.dt,
                          weatherData.timezone
                        )}{" "}
                        IST
                      </span>
                    </h2>
                  )}
                </div>
                <div className="p-5 bg-gradient-to-r from-sky-200 via-indigo-200 to-blue-300">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col justify-center gap-2">
                      <h2 className="text-7xl font-bold text-center text-slate-600">
                        {Math.floor(weatherData?.main?.temp)}°c
                      </h2>
                      <div className="flex items-center justify-between">
                        <p>↑ {Math.floor(weatherData?.main?.temp_max)}°c</p>
                        <p>↓ {Math.floor(weatherData?.main?.temp_min)}°c</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={
                          weatherData &&
                          weatherData.weather &&
                          weatherData.weather[0]
                            ? `https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`
                            : ""
                        }
                        alt=""
                        className="size-20"
                      />
                      <p className="capitalize">
                        {weatherData &&
                        weatherData.weather &&
                        weatherData.weather[0]
                          ? weatherData.weather[0].description
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="my-5">
                    Feels Like{" "}
                    <span className="text-5xl font-semibold text-slate-600">
                      {Math.floor(weatherData?.main?.feels_like)}°c
                    </span>
                  </div>
                  <div className="lg:grid grid-cols-2 gap-x-10 gap-y-2">
                    <div className="flex items-center justify-between border-b-1 border-slate-400 pb-2">
                      <p>Humidity</p>
                      <span>{weatherData?.main?.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-between border-b-1 border-slate-400 pb-2">
                      <p>Wind Speed</p>
                      <span>{weatherData?.wind?.speed} km/h</span>
                    </div>
                    <div className="flex items-center justify-between border-b-1 border-slate-400 pb-2">
                      <p>Pressure</p>
                      <span>
                        {weatherData?.main?.pressure > 1013.25
                          ? `↑ ${weatherData?.main?.pressure}`
                          : `↓ ${weatherData?.main?.pressure}`}{" "}
                        hPa
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b-1 border-slate-400 pb-2">
                      <p>Visibility</p>
                      <span>{weatherData?.visibility / 1000} km</span>
                    </div>
                    <div className="flex items-center justify-between max-lg:border-b-1 max-lg:border-slate-400 max-lg:pb-2">
                      <p>Sunrise</p>
                      <span>
                        {convertUnixToLocalTime(
                          weatherData.sys.sunrise,
                          weatherData.timezone
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Sunset</p>
                      <span>
                        {convertUnixToLocalTime(
                          weatherData.sys.sunset,
                          weatherData.timezone
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 block border-1 border-slate-400 ">
                <Map
                  lat={weatherData?.coord?.lat}
                  long={weatherData?.coord?.lon}
                  name={weatherData?.name}
                />
              </div>
            </>
          )}
        </div>
        {hasError && (
          <div className="mt-5">
            <p className="text-center text-red-500">
              ❌ Something went wrong. Please try again later.
            </p>
          </div>
        )}
        {noRecords && (
          <div className="mt-5">
            <p className="text-center text-red-500">
              City not found! Try another or enter valid city/place name.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Weather;
