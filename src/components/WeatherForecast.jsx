import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
        <Tabs defaultValue={selectedDay} onValueChange={setSelectedDay}>
          <TabsList className="grid w-full grid-cols-5">
            {days.map(([date], index) => (
              <TabsTrigger key={date} value={date}>
                Day {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          {days.map(([date, forecasts]) => (
            <TabsContent key={date} value={date}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {forecasts.map((forecast, index) => (
                  <Card
                    key={index}
                    className="p-3 flex flex-col items-center text-center shadow-md"
                  >
                    <p>{forecast.dt_txt.split(" ")[1].slice(0, -3)}</p>
                    <p className="text-xl font-semibold">
                      {Math.floor(forecast.main.temp)}°C
                    </p>
                    <img
                      src={
                        forecast && forecast.weather && forecast.weather[0]
                          ? `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
                          : ""
                      }
                      alt=""
                      className="size-15"
                    />
                    <p className="capitalize">
                      {forecast.weather[0].description}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-sm"></span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 items-start">
                      <div className="text-left">
                        <p className="text-sm text-slate-400">Humidity</p>
                        <span>{forecast.main.humidity} %</span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-slate-400">Pressure</p>
                        <span>{forecast.main.pressure} hPa</span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-slate-400">Wind</p>
                        <span>{forecast.wind.speed} km/h</span>
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
