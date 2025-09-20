
function Sidepanel({weatherInfo,place}:any) {
  return (
    <main className='w-[22%] bg-[#286299] text-[#eef2f7] h-screen pt-8'>
        <div className='h-full flex flex-col gap-2'>
            
                    <div className='w-[90%] mx-auto bg-[#7799bd] flex justify-between items-center rounded-md px-1 py-0.5'>
                        <div className='flex flex-col'>
                            <p className='text-xl'>{place}</p>
                            <p className='text-xs'>My location</p>
                            <p className='text-xs'>{weatherInfo.weather[0].main}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-center text-lg font-semibold'>{weatherInfo.main.temp.toFixed(0)}°C</p>
                            <div className='flex justify-between gap-1.5 text-xs'>
                                <p>H : {weatherInfo.main.temp_max}°C</p>
                                <p>L : {weatherInfo.main.temp_min}°C</p>
                            </div>
                        </div>
                    </div>
                
        </div>
    </main>
  )
}

export default Sidepanel
