import { useState, useEffect } from "react";
import bgimage from "./assets/bgimage.jpg"
import Sidepanel from "./Components/Sidepanel";
import Maindata from "./Components/Maindata";

function App() {
  const [place, setPlace] = useState<string>("");
  const [temperature, setTemperature] = useState<number | null>(null);


  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      // Reverse Geocoding to get place name
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      const geoData = await geoRes.json();
      if (geoData.length > 0) {
        setPlace(`${geoData[0].name}, ${geoData[0].country}`);
      }


      // Current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      const weatherData = await weatherRes.json();
      setTemperature(weatherData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  // Fetch weather by city name
  const fetchWeatherByCity = async (city: string) => {
    try {
      // Direct Geocoding
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY
        }`
      );
      const geoData = await geoRes.json();


      if (geoData.length > 0) {
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;
        setPlace(`${geoData[0].name}, ${geoData[0].country}`);


        // Now fetch weather for those coords
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY
          }`
        );
        const weatherData = await weatherRes.json();
        setTemperature(weatherData);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };


  // On mount, get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, [])


  return (
    <main className="h-screen w-screen flex justify-between relative">
      <img src={bgimage} alt="Background Image" className="h-full w-full object-center" />
      <section className="absolute w-full h-full flex">
        {temperature && place && <Sidepanel weatherInfo={temperature} place={place} />}
        {temperature && place && <Maindata weatherInfo={temperature} place={place} cityWeather={fetchWeatherByCity} />}
      </section>
    </main>
  );
}

export default App;
