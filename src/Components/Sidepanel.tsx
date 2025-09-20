

const cities = [
    {
        city : "Islamabad",
        weather : "Mostly Sunny",
        temperature : 32,
        highest : 32,
        lowest : 23
    },
    {
        city : "Islamabad",
        weather : "Mostly Sunny",
        temperature : 32,
        highest : 32,
        lowest : 23
    },
    {
        city : "Islamabad",
        weather : "Mostly Sunny",
        temperature : 32,
        highest : 32,
        lowest : 23
    },
]
function Sidepanel() {
  return (
    <main className='w-[22%] bg-[#286299] text-[#eef2f7] h-screen pt-8'>
        <div className='h-full flex flex-col gap-2'>
            {
                cities.map((item,i)=>(
                    <div className='w-[90%] mx-auto bg-[#7799bd] flex justify-between items-center rounded-md px-1 py-0.5' key={i}>
                        <div className='flex flex-col'>
                            <p className='text-xl'>{item.city}</p>
                            <p className='text-xs'>My location</p>
                            <p className='text-xs'>{item.weather}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-center text-lg font-semibold'>{item.temperature}°C</p>
                            <div className='flex justify-between gap-1.5 text-xs'>
                                <p>H : {item.highest}°C</p>
                                <p>L : {item.lowest}°C</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </main>
  )
}

export default Sidepanel
