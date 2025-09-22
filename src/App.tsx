import { useState, useEffect } from "react";
import bgimage from "./assets/bgimage.jpg";
import Sidepanel from "./Components/Sidepanel";
import Maindata from "./Components/Maindata";

function App() {
  const [place, setPlace] = useState<string>("");
  const [temperature, setTemperature] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      const geoData = await geoRes.json();
      if (geoData.length > 0) {
        setPlace(`${geoData[0].name}, ${geoData[0].country}`);
      }

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      const weatherData = await weatherRes.json();
      setTemperature(weatherData);
      setErrorMsg(""); // clear any previous errors
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMsg("Failed to fetch weather data.");
    }
  };

  // Fetch weather by city name
  const fetchWeatherByCity = async (city: string) => {
    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      const geoData = await geoRes.json();

      if (geoData.length > 0) {
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;
        setPlace(`${geoData[0].name}, ${geoData[0].country}`);

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        );
        const weatherData = await weatherRes.json();
        setTemperature(weatherData);
        setErrorMsg("");
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      setErrorMsg("Failed to fetch weather data for city.");
    }
  };

  // Try getting location
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.warn("Geolocation error:", err);
          setErrorMsg(
            "Location is disabled. Please enable location services in your device/browser settings."
          );
          fetchWeatherByCity("Islamabad"); 
        }
      );
    } else {
      setErrorMsg("Geolocation not supported by your browser.");
      fetchWeatherByCity("Islamabad");
    }
  };

  // On mount, request location
  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <main className="h-screen w-screen flex justify-between relative">
      <img
        src={bgimage}
        alt="Background Image"
        className="h-full w-full object-cover absolute top-0 left-0 -z-10"
      />

      <section className="absolute w-full h-full flex">
        {errorMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/80 text-white px-4 py-3 rounded-xl text-sm shadow-md z-20 flex items-center gap-3">
            <span>{errorMsg}</span>
            <button
              onClick={requestLocation}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs"
            >
              Retry Location
            </button>
          </div>
        )}

        {temperature && place && (
          <>
            <Sidepanel weatherInfo={temperature} place={place} />
            <Maindata
              weatherInfo={temperature}
              place={place}
              cityWeather={fetchWeatherByCity}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default App;
