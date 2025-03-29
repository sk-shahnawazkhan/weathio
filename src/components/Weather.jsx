import React, { useEffect, useState } from "react";
import Map from "./Map";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherForecastData, setWeatherForecastData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [noRecords, setNoRecords] = useState(false);
  const [noWFData, setNoWFData] = useState(false);

  useEffect(() => {
    fetchWeatherDetails("Moradabad");
  }, []);

  const APP_ID = import.meta.env.VITE_APP_ID;

  const fetchWeatherDetails = async (location) => {
    try {
      const response = await fetch(`/api/apihandler?location=${location}`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        fetchWeatherForecast(data.coord.lat, data.coord.lon);
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

  const fetchWeatherForecast = async (lat, long) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APP_ID}&units=metric`
      );
      const data = await response.json();
      if (data.cod === "200") {
        setWeatherForecastData(data);
      } else {
        setNoWFData(true);
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
    fetchWeatherDetails(search);
  };

  return (
    <main className="min-h-screen bg-linear-to-bl from-sky-300 to-purple-200">
      <Search
        search={search}
        handleChange={handleChange}
        handleSearch={handleSearch}
        isButtonDisabled={isButtonDisabled}
      />
      <section className="px-10 lg:px-20 min-xl:px-40 py-5 weather-report">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {weatherData && !noRecords && !hasError && (
            <>
              <CurrentWeather weatherData={weatherData} />
              <div className="block border-1 border-slate-400 ">
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
      {weatherForecastData && weatherData && !noRecords && (
        <WeatherForecast weatherForecastData={weatherForecastData} />
      )}
      {noWFData && (
        <div className="mt-5">
          <p className="text-center text-red-500">
            Weather forecast data is not available!
          </p>
        </div>
      )}
    </main>
  );
};

export default Weather;
