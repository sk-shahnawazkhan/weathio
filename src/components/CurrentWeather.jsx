import React from "react";
import {
  convertUnixToLocalTime,
  convertUnixToLocalDateTime,
} from "../utils/dateTime";

const CurrentWeather = ({ weatherData }) => {
  return (
    <div className="shadow-lg">
      <div className="px-5 py-3 bg-gradient-to-l from-sky-300 via-indigo-300 to-blue-200">
        {weatherData.name && (
          <>
            <h2 className="text-xl text-slate-600 font-semibold">
              Current Weather
            </h2>
            <span className="text-sm text-slate-500 font-semibold">
              {weatherData?.name === "Morādābād"
                ? "Moradabad"
                : weatherData?.name}
              , {weatherData?.sys?.country} |{" "}
              {convertUnixToLocalDateTime(weatherData.dt, weatherData.timezone)}
            </span>
          </>
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
                weatherData && weatherData.weather && weatherData.weather[0]
                  ? `https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`
                  : ""
              }
              alt=""
              className="size-20"
            />
            <p className="capitalize">
              {weatherData && weatherData.weather && weatherData.weather[0]
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
            <span>{Math.floor(weatherData?.wind?.speed * 3.6)} km/h</span>
          </div>
          <div className="flex items-center justify-between border-b-1 border-slate-400 pb-2">
            <p>Pressure</p>
            <span>
              {weatherData?.main?.pressure > 1013.25
                ? `↑ ${weatherData?.main?.pressure}`
                : `↓ ${weatherData?.main?.pressure}`}{" "}
              mb
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
  );
};

export default CurrentWeather;
