import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { convertUTCToDayTime } from "@/utils/dateTime";

const WeatherForecast = ({ weatherForecastData }) => {
  const groupedForecast = weatherForecastData.list.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const days = Object.entries(groupedForecast).slice(0, 5);
  const [selectedDay, setSelectedDay] = React.useState(days[0][0]);

  return (
    <section className="px-10 lg:px-20 min-xl:px-40 py-5 weather-report">
      <h2 className="text-xl text-slate-600 font-semibold mb-5">
        5 Days Weather Forecast
      </h2>

      <div className="w-full">
        <Tabs
          defaultValue={selectedDay}
          onValueChange={setSelectedDay}
          className="gap-0"
        >
          <TabsList className="grid w-full grid-cols-5 rounded-none p-0 h-15">
            {days.map(([date], index) => (
              <TabsTrigger
                key={date}
                value={date}
                className="text-slate-950 text-base md:text-lg h-full rounded-none cursor-pointer data-[state=active]:font-semibold data-[state=active]:bg-blue-300 data-[state=active]:text-white"
              >
                Day {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          {days.map(([date, forecasts]) => (
            <TabsContent key={date} value={date}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-5 bg-blue-300">
                {forecasts.map((forecast, index) => (
                  <Card
                    key={index}
                    className="p-5 text-center shadow-md bg-linear-to-r from-violet-200 to-indigo-200 gap-4"
                  >
                    <p className="text-lg font-semibold text-slate-500">
                      {convertUTCToDayTime(forecast.dt_txt)}
                    </p>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col items-start">
                        <p className="text-2xl font-semibold">
                          {Math.floor(forecast.main.temp)}°C
                        </p>
                        <div className="text-xs text-slate-500">
                          High/Low:
                          <span className="ml-2">
                            {Math.floor(forecast.main.temp_max)}°C/
                            {Math.floor(forecast.main.temp_min)}°C
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="text-2xl font-semibold">
                          {Math.floor(forecast.main.feels_like)}°C
                        </p>
                        <span className="text-xs text-slate-500">
                          Feels Like
                        </span>
                      </div>
                    </div>
                    <img
                      src={
                        forecast && forecast.weather && forecast.weather[0]
                          ? `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
                          : ""
                      }
                      alt=""
                      className="size-15 block m-auto"
                    />
                    <p className="capitalize">
                      {forecast.weather[0].description}
                    </p>
                    <div className="grid grid-cols-3 gap-1 text-sm">
                      <div className="text-left">
                        <p className="text-slate-500">Humidity</p>
                        <span>{forecast.main.humidity} %</span>
                      </div>
                      <div className="text-left">
                        <p className="text-slate-500">Pressure</p>
                        <span>
                          {forecast.main.pressure > 1013.25
                            ? `↑ ${forecast.main.pressure}`
                            : `↓ ${forecast.main.pressure}`}{" "}
                          mb
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-slate-500">Wind</p>
                        <span>
                          {Math.floor(forecast.wind.speed * 3.6)} km/h
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default WeatherForecast;
