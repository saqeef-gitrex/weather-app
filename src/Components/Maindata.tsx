import { useState } from "react";

const hourlyData = [
    { time: "Now", icon: "☀️", temp: "32°" },
    { time: "1PM", icon: "☀️", temp: "32°" },
    { time: "2PM", icon: "☀️", temp: "32°" },
    { time: "3PM", icon: "☀️", temp: "32°" },
    { time: "4PM", icon: "☀️", temp: "32°" },
    { time: "5PM", icon: "☀️", temp: "31°" },
    { time: "6PM", icon: "☀️", temp: "30°" },
    { time: "6:08PM", icon: "🌅", temp: "Sunset" },
    { time: "7PM", icon: "🌙", temp: "29°" },
    { time: "8PM", icon: "🌙", temp: "27°" },
    { time: "9PM", icon: "🌙", temp: "27°" },
    { time: "10PM", icon: "🌙", temp: "26°" }
];

const weeklyData = [
    { day: "Today", icon: "☀️", low: "23°", high: "32°", isToday: true },
    { day: "Sat", icon: "☀️", low: "23°", high: "33°" },
    { day: "Sun", icon: "☀️", low: "22°", high: "34°" },
    { day: "Mon", icon: "☀️", low: "23°", high: "35°" },
    { day: "Tue", icon: "☀️", low: "24°", high: "35°" },
    { day: "Wed", icon: "☀️", low: "24°", high: "34°" },
    { day: "Thu", icon: "☀️", low: "24°", high: "34°" },
    { day: "Fri", icon: "☀️", low: "22°", high: "34°" },
    { day: "Sat", icon: "☀️", low: "22°", high: "34°" },
    { day: "Sun", icon: "☀️", low: "22°", high: "34°" }
];

// Mock weather data for demonstration
const mockWeatherInfo = {
    main: {
        temp: 32,
        temp_max: 34,
        temp_min: 23,
        feels_like: 35,
        humidity: 45,
        pressure: 1013
    },
    weather: [
        { main: "Clear" }
    ],
    wind: {
        speed: 15,
        gust: 25
    },
    sys: {
        sunrise: 1695622800,
        sunset: 1695666480
    },
    visibility: 10000
};

function Maindata({ weatherInfo = mockWeatherInfo, place = "Islamabad", cityWeather }: any) {
    const [search, setSearch] = useState<string>("");
    const [data, setData] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
   

    const handleSearchLocation = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (value.length < 2) {
            setData([]);
            setShowDropdown(false);
            return;
        }

        try {
            // Mock search results for demonstration
            const mockResults = [
                { properties: { city: "Karachi", formatted: "Karachi, Sindh, Pakistan" } },
                { properties: { city: "Lahore", formatted: "Lahore, Punjab, Pakistan" } },
                { properties: { city: "Islamabad", formatted: "Islamabad, Pakistan" } }
            ];
            setData(mockResults);
            setShowDropdown(true);
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    const handleSelectPlace = async (place: any) => {
        setSearch(place.properties.city);
        setShowDropdown(false);
        if (cityWeather) {
            cityWeather(place.properties.city);
        }
    };


    return (
        <main className='absolute lg:relative flex-1 h-screen p-6 overflow-auto'>
            {/* Top Section */}
            <div className='h-full flex flex-col'>
                {/* Search Bar */}
                <div className='flex justify-end mb-6 relative'>
                    <input
                        type='text'
                        className='bg-black/30 backdrop-blur-sm rounded-lg placeholder-white/70 font-light px-4 py-2 text-white text-sm border border-white/20 w-[240px]'
                        placeholder='🔍 Search'
                        value={search}
                        onChange={handleSearchLocation}
                        onFocus={() => search && setShowDropdown(true)}
                    />

                    {/* Dropdown */}
                    {showDropdown && data.length > 0 && (
                        <ul className='absolute top-full mt-2 right-0 w-[240px] bg-black/70 backdrop-blur-md rounded-lg border border-white/20 max-h-60 overflow-y-auto z-10 no-scrollbar'>
                            {data.map((place, index) => (
                                <li
                                    key={index}
                                    className='px-4 py-2 text-white text-sm cursor-pointer hover:bg-white/10'
                                    onClick={() => handleSelectPlace(place)}
                                >
                                    {place.properties.formatted}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Main Weather Info */}
                <div className='flex justify-center mb-8'>
                    <div className='text-white flex flex-col items-center'>
                        <p className='text-sm opacity-80 mb-2 tracking-wide'>LOCATION</p>
                        <p className='text-4xl font-light mb-4'>{place}</p>
                        <p className='text-7xl font-thin mb-4'>{weatherInfo.main.temp.toFixed(0)}°C</p>
                        <p className='text-xl mb-4'>{weatherInfo.weather[0].main}</p>
                        <div className='flex gap-6 text-sm'>
                            <p>H:{weatherInfo.main.temp_max}° L:{weatherInfo.main.temp_min}°</p>
                        </div>
                    </div>
                </div>

                {/* =========================
                    RESPONSIVE GRID START
                    Small/Medium: 3 columns
                    Large+: 6 columns × 4 rows
                   ========================= */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 grid-rows-auto lg:grid-rows-4 gap-6'>
                    {/* Row 1 (cols 1-4): Weather Description + Hourly Forecast (stacked) */}
                    <div className='col-span-2 md:col-span-3 lg:col-span-4 lg:row-span-1 space-y-6'>
                        {/* Weather Description */}
                        <div className='bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10 w-full'>
                            <p className='text-white/90 text-sm text-center'>
                                Sunny conditions will continue for the rest of the day. Wind gusts are up to {weatherInfo.wind.gust} km/h.
                            </p>
                        </div>

                        {/* Hourly Forecast */}
                        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10 w-full">
                            <div className="flex overflow-x-auto space-x-8 pb-2 no-scrollbar">
                                {hourlyData.map((hour, index) => (
                                    <div key={index} className="flex flex-col items-center min-w-[70px] text-white">
                                        <p className="text-sm opacity-80 mb-3">{hour.time}</p>
                                        <div className="text-2xl mb-3">{hour.icon}</div>
                                        <p className="text-sm font-medium">{hour.temp}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Map area: spans cols 5-6 and rows 1-2 on lg+, full width on sm/md */}
                    <div className='col-span-2 md:col-span-3 lg:col-start-5 lg:col-span-2 lg:row-start-1 lg:row-span-2 bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10'>
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='text-white/60 text-lg'>🗺️</span>
                            <h3 className='text-white/80 text-sm font-medium tracking-wide'>MAPS</h3>
                        </div>
                        <div className='relative h-56 bg-gradient-to-b from-blue-900/30 to-blue-800/50 rounded-xl overflow-hidden'>
                            {/* Map placeholder / simple representation */}
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='relative'>
                                    <div className='w-32 h-20 bg-green-600/40 rounded-lg'></div>
                                    <div className='absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                                        <span className='text-white text-xs'>32</span>
                                    </div>
                                    <p className='text-white text-xs mt-2 text-center'>My Location</p>
                                </div>
                            </div>

                            <div className='absolute top-4 left-4'>
                                <div className='w-2 h-2 bg-white rounded-full'></div>
                                <p className='text-white text-xs mt-1'>Kabul</p>
                            </div>
                            <div className='absolute bottom-6 right-6'>
                                <div className='w-2 h-2 bg-white rounded-full'></div>
                                <p className='text-white text-xs mt-1'>Karachi</p>
                            </div>
                        </div>
                    </div>

                    {/* 10-day forecast: columns 1-2, rows 2-4 on lg+, full width on sm/md */}
                    <div className='col-span-2 md:col-span-3 lg:col-start-1 lg:col-span-3 lg:row-start-2 lg:row-span-3 bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10'>
                        <div className='flex items-center gap-3 mb-6'>
                            <span className='text-white/60 text-lg'>📅</span>
                            <h3 className='text-white/80 text-sm font-medium tracking-wide'>10-DAY FORECAST</h3>
                        </div>
                        <div className='space-y-4'>
                            {weeklyData.map((day, index) => (
                                <div key={index} className='flex items-center justify-between text-white py-1'>
                                    <div className='flex items-center gap-2 sm:gap-4 flex-1 min-w-0'>
                                        <p className='text-xs sm:text-sm w-12 sm:w-16 font-medium flex-shrink-0'>{day.day}</p>
                                        <span className='text-lg sm:text-xl flex-shrink-0'>{day.icon}</span>
                                    </div>
                                    <div className='flex items-center gap-2 sm:gap-4 flex-shrink-0'>
                                        <p className='text-xs sm:text-sm opacity-60 w-6 sm:w-8'>{day.low}</p>
                                        <div className='w-12 sm:w-20 h-1.5 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full'></div>
                                        <p className='text-xs sm:text-sm w-6 sm:w-8'>{day.high}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 - UV Index (col 4 on lg+, col 1 on sm/md) */}
                    <div className='col-span-1 lg:col-start-4 lg:row-start-2 lg:row-span-1 bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10'>
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='text-white/60 text-lg'>☀️</span>
                            <h3 className='text-white/80 text-xs font-medium tracking-wide'>UV INDEX</h3>
                        </div>
                        <div className='text-white'>
                            <p className='text-3xl font-light mb-2'>8</p>
                            <p className='text-sm text-purple-400 mb-2'>Very High</p>
                            <div className='w-full h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full mb-2'></div>
                            <p className='text-xs opacity-70'>Use sun protection until 4pm.</p>
                        </div>
                    </div>

                    {/* Row 2 - Sunset (col 4 on lg+, col 2 on sm/md) */}
                    <div className='col-span-1 lg:col-start-4 lg:row-start-2 lg:row-span-1 bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10'>
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='text-white/60 text-lg'>🌅</span>
                            <h3 className='text-white/80 text-xs font-medium tracking-wide'>SUNSET</h3>
                        </div>
                        <div className='text-white'>
                            <p className='text-3xl font-light mb-4'>{new Date(weatherInfo.sys.sunset * 1000).toLocaleString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}</p>
                            <div className='w-16 h-16 mx-auto mb-3 relative'>
                                <div className='w-16 h-8 bg-gradient-to-b from-orange-300 to-orange-500 rounded-t-full'></div>
                                <div className='w-16 h-8 bg-gradient-to-t from-blue-800 to-blue-600 rounded-b-full'></div>
                            </div>
                            <p className='text-xs opacity-70 text-center'>Sunrise: {new Date(weatherInfo.sys.sunrise * 1000).toLocaleString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}</p>
                        </div>
                    </div>

                    {/* Row 3: four small boxes (cols 4-6 on lg+, span across sm/md) */}
                    {/* Wind */}
                    <div className='col-span-1 lg:col-start-4 lg:row-start-3 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10'>
                        <div className='flex items-center gap-1 mb-2'>
                            <span className='text-white/60 text-sm'>💨</span>
                            <h3 className='text-white/80 text-xs font-medium'>WIND</h3>
                        </div>
                        <div className='text-white'>
                            <div className='flex items-center justify-center mb-2'>
                                <div className='w-8 h-8 rounded-full border border-white/30 flex items-center justify-center'>
                                    <span className='text-xs'>↗</span>
                                </div>
                            </div>
                            <p className='text-xs text-center'>{weatherInfo.wind.speed} km/h</p>
                            <p className='text-xs opacity-60 text-center'>Gusts: {weatherInfo.wind.gust} km/h SW</p>
                        </div>
                    </div>

                    {/* Waning Crescent */}
                    <div className='col-span-1 lg:col-start-4 lg:row-start-3 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10'>
                        <div className='flex items-center gap-1 mb-2'>
                            <span className='text-white/60 text-sm'>🌙</span>
                            <h3 className='text-white/80 text-xs font-medium'>WANING CRESCENT</h3>
                        </div>
                        <div className='text-white text-center'>
                            <div className='w-8 h-8 mx-auto mb-2 relative'>
                                <div className='w-8 h-8 bg-white/20 rounded-full'></div>
                                <div className='absolute inset-0 w-4 h-8 bg-white/80 rounded-l-full'></div>
                            </div>
                            <p className='text-xs opacity-60'>Moonset: 4:56PM</p>
                        </div>
                    </div>

                    {/* Precipitation */}
                    <div className='col-span-1 lg:col-start-5 lg:row-start-3 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10'>
                        <div className='flex items-center gap-1 mb-2'>
                            <span className='text-white/60 text-sm'>🌧️</span>
                            <h3 className='text-white/80 text-xs font-medium'>PRECIPITATION</h3>
                        </div>
                        <div className='text-white'>
                            <p className='text-xl font-light mb-1'>0 mm</p>
                            <p className='text-xs mb-1'>Today</p>
                            <p className='text-xs opacity-60'>None expected in next 10 days.</p>
                        </div>
                    </div>

                    {/* Feels Like */}
                    <div className='col-span-1 lg:col-start-6 lg:row-start-3 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10'>
                        <div className='flex items-center gap-1 mb-2'>
                            <span className='text-white/60 text-sm'>🌡️</span>
                            <h3 className='text-white/80 text-xs font-medium'>FEELS LIKE</h3>
                        </div>
                        <div className='text-white'>
                            <p className='text-xl font-light mb-2'>{weatherInfo.main.feels_like.toFixed(0)}°C</p>
                            <p className='text-xs opacity-60'>It feels hotter than the actual temperature.</p>
                        </div>
                    </div>

                    {/* Row 4: four small boxes (cols 4-6 on lg+, span across sm/md) */}
                    {/* Humidity */}
                    <div className='col-span-1 lg:col-start-4 lg:row-start-4 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10'>
                        <div className='flex items-center gap-1 mb-2'>
                            <span className='text-white/60 text-sm'>💧</span>
                            <h3 className='text-white/80 text-xs font-medium'>HUMIDITY</h3>
                        </div>
                        <div className='text-white'>
                            <p className='text-xl font-light mb-2'>{weatherInfo.main.humidity}%</p>
                            <p className='text-xs opacity-60'>The dew point is 20° right now.</p>
                        </div>
                    </div>

                    {/* Visibility */}
                    <div className='col-span-1 lg:col-start-4 lg:row-start-4 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10'>
                        <div className='flex items-center gap-1 mb-2'>
                            <span className='text-white/60 text-sm'>👁️</span>
                            <h3 className='text-white/80 text-xs font-medium'>VISIBILITY</h3>
                        </div>
                        <div className='text-white'>
                            <p className='text-xl font-light mb-2'>{weatherInfo.visibility / 1000} km</p>
                            <p className='text-xs opacity-60'>Perfectly clear view.</p>
                        </div>
                    </div>

                    {/* Pressure */}
                    <div className='col-span-1 lg:col-start-5 lg:row-start-4 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10'>
                        <div className='flex items-center gap-1 mb-2'>
                            <span className='text-white/60 text-sm'>📊</span>
                            <h3 className='text-white/80 text-xs font-medium'>PRESSURE</h3>
                        </div>
                        <div className='text-white'>
                            <div className='relative mb-2'>
                                <div className='w-10 h-10 mx-auto rounded-full border-2 border-white/30 relative'>
                                    <div className='absolute inset-2 bg-blue-500 rounded-full flex items-center justify-center'>
                                        <div className='w-1 h-4 bg-white transform rotate-45 rounded-full'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between text-xs mb-1'>
                                <span>Low</span>
                                <span>High</span>
                            </div>
                            <p className='text-xs text-center opacity-80'>{weatherInfo.main.pressure} hPa</p>
                        </div>
                    </div>

                    {/* Averages */}
                    <div className='col-span-1 lg:col-start-6 lg:row-start-4 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10'>
                        <div className='flex items-center gap-1 mb-2'>
                            <span className='text-white/60 text-sm'>📈</span>
                            <h3 className='text-white/80 text-xs font-medium'>AVERAGES</h3>
                        </div>
                        <div className='text-white'>
                            <p className='text-lg font-light mb-1'>+1°</p>
                            <p className='text-xs mb-2'>Average daily high</p>
                            <div className='flex justify-between text-xs opacity-60'>
                                <div className='text-center'>
                                    <div>Today</div>
                                    <div>Average</div>
                                </div>
                                <div className='text-center'>
                                    <div>H:32°</div>
                                    <div>H:31°</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* =========================
                    GRID END
                   ========================= */}
            </div>
        </main>
    )
}

export default Maindata