import { useState} from "react";
import { Menu, X } from "lucide-react";


function Sidepanel({ weatherInfo , place }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Burger Icon - visible only on small/medium screens */}
      <div className={`lg:hidden fixed p-4 z-10`}>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-black/30 transition-colors"
        >
          <Menu size={24} className="text-white" />
        </button>
      </div>

      {/* Desktop Sidepanel (always visible on lg+) */}
      <aside className="hidden lg:block w-[280px] xl:w-[320px] bg-[#286299] text-[#eef2f7] h-screen pt-8 flex-shrink-0">
        <div className="h-full flex flex-col gap-2 px-4">
          <div className="w-full bg-[#7799bd] flex justify-between items-center rounded-md px-3 py-3">
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-lg xl:text-xl font-medium truncate">{place}</p>
              <p className="text-xs opacity-80">My location</p>
              <p className="text-xs opacity-80">{weatherInfo.weather[0].main}</p>
            </div>
            <div className="flex flex-col gap-1 ml-2 flex-shrink-0">
              <p className="text-center text-lg xl:text-xl font-semibold">
                {weatherInfo.main.temp.toFixed(0)}°C
              </p>
              <div className="flex justify-between gap-2 text-xs">
                <p>H: {weatherInfo.main.temp_max}°C</p>
                <p>L: {weatherInfo.main.temp_min}°C</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile/Tablet Overlay and Sliding Panel */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleOverlayClick}
          />
          
          {/* Sliding Panel */}
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[320px] sm:w-[60%] md:w-[50%] bg-[#286299] text-[#eef2f7] shadow-2xl transform transition-transform duration-300 ease-out">
            <div className="h-full flex flex-col pt-8">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close panel"
              >
                <X size={20} className="text-white" />
              </button>

              {/* Content */}
              <div className="flex flex-col gap-2 px-4 mt-4">
                <div className="w-full bg-[#7799bd] flex justify-between items-center rounded-md px-3 py-3">
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-lg font-medium truncate">{place}</p>
                    <p className="text-xs opacity-80">My location</p>
                    <p className="text-xs opacity-80">{weatherInfo.weather[0].main}</p>
                  </div>
                  <div className="flex flex-col gap-1 ml-2 flex-shrink-0">
                    <p className="text-center text-lg font-semibold">
                      {weatherInfo.main.temp.toFixed(0)}°C
                    </p>
                    <div className="flex justify-between gap-2 text-xs">
                      <p>H: {weatherInfo.main.temp_max}°C</p>
                      <p>L: {weatherInfo.main.temp_min}°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidepanel;