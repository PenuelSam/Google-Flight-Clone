import { useFormContext } from 'react-hook-form';
import { TripOrigin, PlaceOutlined, SwapHoriz } from '@mui/icons-material';

const OneWay = () => {
  const { register } = useFormContext();

  return (
    <div className="flex md:flex-row flex-col gap-4 mt-4 w-full">
      <div className="flex items-center relative gap-4">
       {/* From Input */}
       <div className="border  dark:border-[#8f8e8e] relative group md:py-2 md:px-8 px-2 flex items-center  hover:border-[#333] dark:hover:border-[#fff] transition-all duration-300 ease-in-out rounded-md">
          <div className={`absolute -right-2  bg-[#fff]  dark:bg-[#202124]  w-[20px] md:h-[50px] h-[30px] rounded-l-full border-l group-hover:border-[#333] dark:group-hover:border-[#fff] transition-all duration-300 ease-in-out`}></div>
          <TripOrigin className="text-[#8b8b8b]" fontSize="small" />
          <input
            {...register("from")}  // Bind input to react-hook-form
            type="text"
            placeholder="From"
            className="md:p-3 py-3 px-1 md:w-auto w-[50%] border-none bg-transparent outline-none md:text-[1rem] md:placeholder:text-[1rem]  placeholder:text-[#8b8b8b]"
          />
        </div>

        {/* Swap Icon */}
        <div className="absolute left-[50%] translate-x-[-80%] md:translate-x-[-50%] z-10 bg-white dark:bg-[#202124]">
          <SwapHoriz className="text-[#8b8b8b]" fontSize="medium" />
        </div>

        {/* To Input */}
        <div className="relative group border  dark:border-[#8f8e8e] md:py-2 md:px-8 px-2 pl-4 flex items-center hover:border-[#333] dark:hover:border-[#fff] transition-all duration-300 ease-in-out rounded-md">
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

      {/* Departure Only */}
      <div className="flex items-center border rounded-lg md:w-[500px] w-full">
        <input
          {...register("departure")}
          type="date"
          
          placeholder="Departure"
          className="p-3 w-[100%] dark:bg-transparent h-full hover:border border-black rounded-md placeholder:text-[1.5rem] placeholder:text-black"
        />
      </div>
    </div>
  );
};

export default OneWay;
