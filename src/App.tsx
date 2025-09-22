import { useState, useEffect } from "react";
import bgimage from "./assets/bgimage.jpg";
import Sidepanel from "./Components/Sidepanel";
import Maindata from "./Components/Maindata";

function App() {
  const [place, setPlace] = useState<string>("");
  const [temperature, setTemperature] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setIsLoading(true);
      // Reverse Geocoding
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      const geoData = await geoRes.json();
      if (geoData.length > 0) {
        setPlace(`${geoData[0].name}, ${geoData[0].country}`);
      }

      // Current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      const weatherData = await weatherRes.json();
      setTemperature(weatherData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMsg("Failed to fetch weather data.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch weather by city name
  const fetchWeatherByCity = async (city: string) => {
    try {
      setIsLoading(true);
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
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      setErrorMsg("Failed to fetch weather data for city.");
    } finally {
      setIsLoading(false);
    }
  };

  // On mount, ask for location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.warn("Geolocation error:", err);
          fetchWeatherByCity("Islamabad"); 
        }
      );
    } else {
      setErrorMsg("Geolocation not supported by your browser.");
      fetchWeatherByCity("Islamabad");
    }
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
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/80 text-white px-4 py-2 rounded-xl text-sm shadow-md z-20">
            {errorMsg}
          </div>
        )}

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-gray-700 font-medium">Loading weather data...</p>
            </div>
          </div>
        ) : (
          temperature && place && (
            <>
              <Sidepanel weatherInfo={temperature} place={place} />
              <Maindata
                weatherInfo={temperature}
                place={place}
                cityWeather={fetchWeatherByCity}
              />
            </>
          )
        )}
      </section>
    </main>
  );
}

export default App;