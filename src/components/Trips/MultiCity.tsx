import { TripOrigin, PlaceOutlined, SwapHoriz, Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { useTheme } from '../../context/ThemeContext';

const MultiCity = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "multiCity",
  });

  const theme = useTheme()
    const isDark = theme.theme === 'dark';
  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      {fields.map((field, index) => (
        <div key={field.id} className="flex md:flex-row flex-col gap-4 items-center w-full relative">
          <div className="flex items-center relative gap-4">
            {/* From Input */}
            <div className="border relative group md:py-2 md:px-6 px-2 flex items-center  hover:border-[#333] dark:hover:border-[#fff] transition-all duration-300 ease-in-out rounded-md">
            <div className="absolute -right-1 bg-white dark:bg-[#202124] w-[20px] md:h-[50px] h-[30px] rounded-l-full border-l group-hover:border-[#333] dark:group-hover:border-[#ededed] transition-all duration-300 ease-in-out"></div>
              <TripOrigin className="text-[#8b8b8b]" fontSize="small" />
              <Controller
                name={`multiCity.${index}.from`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="From"
                     className="md:p-3 py-3 px-1 md:w-auto w-[50%] border-none bg-transparent outline-none md:text-[1rem] md:placeholder:text-[1rem]  placeholder:text-[#8b8b8b]"
                  />
                )}
              />
            </div>

            
        {/* Swap Icon */}
        <div className="absolute left-[50%] translate-x-[-70%] md:translate-x-[-50%] z-10 bg-white dark:bg-[#202124]">
          <SwapHoriz className="text-[#8b8b8b]" fontSize="medium" />
        </div>

            {/* To Input */}
            <div className="relative group border border-[#ededed] md:py-2 md:px-6 px-2 flex items-center hover:border-[#333] dark:hover:border-[#fff] transition-all duration-300 ease-in-out rounded-md pl-4">
            <div className="absolute -left-2 bg-white dark:bg-[#202124] w-[20px] md:h-[50px] h-[30px] rounded-r-full border-r group-hover:border-[#333] dark:group-hover:border-[#ededed] transition-all duration-300 ease-in-out"></div>
              <PlaceOutlined className="text-[#8b8b8b]" fontSize="small" />
              <Controller
                name={`multiCity.${index}.to`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Where To?"
                    className="md:p-3 py-3 px-1  md:w-auto w-[50%] border-none outline-none md:text-[1rem] bg-transparent md:placeholder:text-[1.1rem] placeholder:text-[#8b8b8b]"
                  />
                )}
              />
            </div>
          </div>

          {/* Departure Input */}
          <div className="flex items-center border rounded-lg md:w-[500px] w-[98%] md:h-[70px] ">
            <Controller
              name={`multiCity.${index}.departure`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  
                  className="p-3 w-[100%] h-full hover:border dark:bg-transparent border-black  rounded-md placeholder:text-[1.5rem] placeholder:text-black"
                />
              )}
            />
          </div>

          {/* Delete Flight Button */}
          {fields.length > 1 && (
            <IconButton onClick={() => remove(index)} aria-label="delete flight ">
              <Close sx={{color: isDark ? 'white' : 'black' }}/>
            </IconButton>
          )}
        </div>
      ))}

      {/* Add Flight Button */}
      <div className="flex justify-start mt-4">
        <button
          type="button"
          onClick={() => append({ from: '', to: '', departure: '' })}
          className="flex items-center gap-2 bg-black  dark:bg-white dark:text-black text-white px-4 py-1 ml-2 rounded-full text-lg font-semibold"
        >
          Add flight
        </button>
      </div>
    </div>
  );
};

export default MultiCity;
