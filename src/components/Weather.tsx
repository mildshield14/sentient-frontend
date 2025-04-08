import { useEffect, useState } from "react";
import axios from "axios";
import "../scss/Weather.scss";
import {
  faBars,
  faArrowRightFromBracket,
  faGear,
  faMusic,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [isWeatherOpen, setIsWeatherOpen] = useState(null);

  const toggleMenu = () => {
    setIsWeatherOpen(!isWeatherOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const weatherResponse = await axios.get(
                `${import.meta.env.VITE_DOMAIN}/weather`,
                {
                  params: { lat, lon },
                }
            );
            console.log("Weather Data:", weatherResponse.data);
            setWeather(weatherResponse.data);
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        });
      } else {
        const lat = 43.6;
        const lon = -73.9;

        try {
          const weatherResponse = await axios.get(
              `${import.meta.env.VITE_DOMAIN}/weather`,
              {
                params: { lat, lon },
              }
          );
          console.log("Weather Data:", weatherResponse.data);
          setWeather(weatherResponse.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
        console.error("Geolocation is not supported by this browser.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="weather">
      {weather ? (
        <>
          {!isWeatherOpen ? (
            <div className="weather__basic" onClick={toggleMenu}>
              <div className="weather__current__combined">
                <div className="weather__current__temp">
                  {weather.current.temperature}°C
                </div>
                <div
                  className={`weather__icon-${weather.current.weatherCode}`}
                ></div>
              </div>
              <div className="weather__current__location">
                <h2 className="weather__city">
                  {weather.location},{" "}
                  <span>
                    {weather.country == "CA" ? weather.state : weather.country}
                  </span>
                </h2>
              </div>
            </div>
          ) : (
            <div className="weather__detailed" onClick={toggleMenu}>
              <div className="weather__detailed__combined">
                <div className="weather__detailed__combined-left">
                  <div className="weather__current__location">
                    <h2 className="weather__city">
                      {weather.location},{" "}
                      <span>
                        {weather.country == "CA"
                          ? weather.state
                          : weather.country}
                      </span>
                    </h2>
                  </div>
                  <div className="weather__current__temp">
                    {weather.current.temperature}°C
                  </div>
                </div>
                <div className="weather__detailed__combined-right">
                  <div
                    className={`weather__icon-${weather.current.weatherCode}`}
                  ></div>
                </div>
              </div>

              <div className="weather__current__feelslike">
                Feels like {weather.current.feelsLike}°C
              </div>

              <div className="weather__detailed__bar"></div>
              <div className="weather__hourly__container">
                {weather.hourly.map((hour: any, index: number) => (
                  <div key={index} className="weather__hourly">
                    <div className="weather__hourly__time">{hour.time}</div>
                    <div className={`weather__icon-${hour.weatherCode}`}></div>
                    <div className="weather__hourly__temp">
                      {hour.temperature}°C
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        "No weather available"
      )}
    </div>
  );
}

export default Weather;
