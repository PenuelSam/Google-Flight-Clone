import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from "@mui/material";
import { AirlineSeatLegroomExtra, Wifi, Usb, OndemandVideo, Public } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type FlightData = {
    departure: {
        departureTime: string;
    };
    arrival: {
        arrivalTime: string;
    };
    cost: number;
    origin: {
        city: string;
        name: string;
    };
    destination: {
        city: string;
        name: string;
    };
    durationInMinutes: number;
};

type SingleProps = {
    data: FlightData;
    displayData?: FlightData;
    logo?: string;
    airlineName?: string;
    isDark: boolean;
  };
  
 export function SingleItineraryAccordion({ data, displayData, logo, airlineName, isDark }: SingleProps) {
    const { departure, arrival, cost } = data;
    const info = displayData || data;
  
   
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Accordion
        sx={{
         width: {
            xs: '95%', 
            md: '100%' 
        },
        mx: 'auto',
        backgroundColor: isDark ? 'transparent' : '#fff',
        color: isDark ? '#fff' : '#333',
        border: isDark ? '1px solid #ededed' : '1px solid gray',
        borderRadius: '10px',
        mb: 2,   
        overflow: 'hidden', 
        boxSizing: 'border-box',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: isDark ? '#ededed' : '#333' }} />}
          aria-controls="flight-itinerary-content"
          id="flight-itinerary-header"
        >
        <div className='w-full flex justify-between items-center md:px-5'>
      <div className='flex items-center md:gap-5 gap-2'>
        <div>
        <img src={logo} alt="Airline Logo" style={{ width: 20, height: 20 }} />
        </div>
        <div className='flex flex-col'>
       <div className='flex items-center gap-2 '>
       <p className='font-bold md:text-[16px] text-[14px]' > {departure.departureTime}</p>
       <span className={`${isDark ? 'bg-white' : 'bg-black'} w-3 h-[0.1px]`}></span>
       <p className=' font-bold md:text-[16px] text-[14px]'> {arrival.arrivalTime}</p>
       </div>
        <div>
        <Typography variant="body2" sx={{  fontSize: '12px', color: isDark ? '#ededed' : '#333' }}>{airlineName}</Typography>
        </div> 
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex items-center gap-2'>
        <p className='font-bold text-[1.2rem] md:block hidden'> {info.origin.city}</p>
        <span className={`${isDark ? 'bg-white' : 'bg-black'} md:block hidden w-3 h-[0.1px]`}></span>
        <p className='font-bold text-[1.2rem] md:block hidden'> {info.destination.city}</p>
        </div>
      <p className="md:block hidden">{formatDuration(info.durationInMinutes)}</p> 
      </div>
      <div >
        <p className='font-bold text-[14px] md:text-[18px]'> ${cost}</p>
      </div>
    </div>
        </AccordionSummary>
        <Divider sx={{ backgroundColor: isDark ? '#ededed' : '#333', opacity: 0.2 }} />
        <AccordionDetails sx={{ width: '100%', overflowX: 'hidden', px: { xs: 2, md: 8 } }}>
         <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-4 box-border">
           <div className='flex gap-2 '>
             <div className='flex w-4  flex-col items-center gap-2 md:mt-1 mt-2'>
               <p className='border-2 md:w-4 w-3 md:h-4 h-3 rounded-full'></p>
               <p className='bg-[#ededed] w-1 h-1 rounded-full'></p>
               <p className='bg-[#ededed] w-1 h-1 rounded-full'></p>
               <p className='bg-[#ededed] w-1 h-1 rounded-full'></p>
               <p className='border-2 md:w-4 w-3 md:h-4 h-3 rounded-full'></p>
             </div>
            <div>
            <div className='flex items-center gap-5'>
             <p className='text-[14px] md:text-[16px] font-semibold'>{departure.departureTime}</p>
             <p className='text-[14px] md:text-[16px] font-semibold'>{info.origin.name} Airport</p>
             </div>
             <p className={`text-[14px] ${isDark ? 'text-[#ededed]' : 'text-[#333]'}  py-2`}>Travel Time: {formatDuration(info.durationInMinutes)}</p>
             <div className='flex items-center gap-5'>
             <p className='text-[14px] md:text-[16px] font-semibold'>{arrival.arrivalTime}</p>
             <p className='text-[14px] md:text-[16px] font-semibold'>{info.destination.name} Airport</p>
             </div>
             <p className={`text-[14px] ${isDark ? 'text-[#ededed]' : 'text-[#333]'}  py-2`}>{airlineName}</p>
            </div>
           </div>
         
           <div className='flex flex-col gap-2'>
               <div className='flex items-center gap-2'>
                 <AirlineSeatLegroomExtra sx={{ color: isDark ? '#ededed' : 'gray', fontSize: '14px' }} fontSize='small'/>
                 <p className={`text-[14px] ${isDark ? 'text-[#ededed]' : 'text-gray-500'}`}>Average legroom (31 in)</p>
               </div>
               <div className='flex items-center gap-2'>
                 <Wifi sx={{ color: isDark ? '#ededed' : 'gray', fontSize: '14px' }} fontSize='small'/>
                 <p className={`text-[14px] ${isDark ? 'text-[#ededed]' : 'text-gray-500'}`}>Wi-Fi for a fee</p>
               </div>
               <div className='flex items-center gap-2'>
                 <Usb  sx={{ color: isDark ? '#ededed' : 'gray', fontSize: '14px' }} fontSize='small' />
                 <p className={`text-[14px] ${isDark ? 'text-[#ededed]' : 'text-gray-500'}`}>In-seat USB outlet</p>
               </div>
               <div className='flex items-center gap-2'>
                 <OndemandVideo sx={{ color: isDark ? '#ededed' : 'gray', fontSize: '14px' }} fontSize='small'/>
                 <p className={`text-[14px] ${isDark ? 'text-[#ededed]' : 'text-gray-500'}`}>On-demand video</p>
               </div>
               <div className='flex items-center gap-2'>
                 <Public sx={{ color: isDark ? '#ededed' : 'gray', fontSize: '14px' }} fontSize='small'/>
                 <p className={`text-[14px] ${isDark ? 'text-[#ededed]' : 'text-gray-500'}`}>Emissions estimate: 446 kg CO2e</p>
               </div>
           </div>
           </div>
        </AccordionDetails>
      </Accordion>
      </div>
    );
  }
  

  function formatDuration(durationInMinutes: number) {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
  
    return `${hours}hr ${minutes}min`;
  }