import { useFormContext } from 'react-hook-form';
import { TripOrigin, PlaceOutlined, SwapHoriz } from '@mui/icons-material';




const RoundTrip = () => {
  // Access form context from react-hook-form
  const { register } = useFormContext();


  return (
    <div className="flex md:flex-row flex-col gap-4 mt-4 w-full ">
      <div className="flex items-center  md:w-auto w-[98%] mx-auto md:mx-0 relative gap-4">
        {/* From Input */}
        <div className="border relative group md:py-2 md:px-10 px-2 flex items-center  hover:border-[#333] transition-all duration-300 ease-in-out rounded-md">
          <div className={`absolute -right-1  bg-[#fff]  dark:bg-[#202124]  w-[20px] md:h-[50px] h-[30px] rounded-l-full border-l group-hover:border-[#333] dark:group-hover:border-[#fff] transition-all duration-300 ease-in-out`}></div>
          <TripOrigin className="text-[#8b8b8b]" fontSize="small" />
          <input
            {...register("from")}  // Bind input to react-hook-form
            type="text"
            placeholder="From"
            className="md:p-3 py-3 px-1 md:w-auto w-[50%] border-none bg-transparent outline-none md:text-[1rem] md:placeholder:text-[1rem]  placeholder:text-[#8b8b8b]"
          />
        </div>

        {/* Swap Icon */}
        <div className="absolute left-[50%] translate-x-[-50%] md:translate-x-[-50%] z-10 bg-white dark:bg-[#202124]">
          <SwapHoriz className="text-[#8b8b8b]" fontSize="medium" />
        </div>

        {/* To Input */}
        <div className="relative  group border md:py-2 md:px-10 px-2 flex items-center hover:border-[#333] transition-all duration-300 ease-in-out rounded-md pl-4 ">
          <div className="absolute -left-1 bg-[#fff] dark:bg-[#202124] w-[20px] md:h-[50px] h-[30px] rounded-r-full border-r group-hover:border-[#333] dark:group-hover:border-[#fff] transition-all duration-300 ease-in-out"></div>
          <PlaceOutlined className="text-[#8b8b8b]" fontSize="small" />
          <input
            {...register("to")}  // Bind input to react-hook-form
            type="text"
            placeholder="Where to?"
            className="md:p-3 py-3 px-1 md:w-auto w-[50%] border-none outline-none md:text-[1rem] bg-transparent md:placeholder:text-[1.1rem] placeholder:text-[#8b8b8b]"
          />
        </div>
      </div>

      {/* Departure and Return Inputs */}
      <div className="flex items-center border rounded-lg md:w-[500px] w-[98%] mx-auto md:mx-0 h-[60px]">
        <input
          {...register("departure")}  // Bind input to react-hook-form
          type="date"
         
          placeholder="Departure"
          className="p-3 w-[50%] h-full hover:border bg-transparent md:border-black border-white rounded-md placeholder:text-[1.5rem] placeholder:text-black"
        />
        <div className="h-[60%] w-[0.5px] bg-[#333]"></div>
        <input
          {...register("return")}  // Bind input to react-hook-form
          type="date"
          
          placeholder="Return"
          className="p-3 w-[50%] h-full hover:border bg-transparent md:border-black border-white rounded-md placeholder:text-[1.5rem] placeholder:text-black"
        />
      </div>
    </div>
  );
};

export default RoundTrip;
