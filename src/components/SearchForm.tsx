import { useState } from "react";
import { SyncAlt, MultipleStop, TrendingFlat, KeyboardArrowDown, KeyboardArrowUp, Check, Person2Outlined,Search,} from "@mui/icons-material";
import { Menu,MenuItem,IconButton,Typography,Button,Box,} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RoundTrip from "./Trips/RoundTrip";
import OneWay from "./Trips/OneWay";
import MultiCity from "./Trips/MultiCity";
import { useFlightStore } from "../store/useFlightStore";
import { useNavigate } from "react-router-dom";
import { fetchFlightDetails } from "../hooks/fetchFlights";
import { useTheme } from "../context/ThemeContext";
import { useFlights } from "../hooks/useFlight";
import type { FormValues } from "../types";

type SearchFormProps = {
  defaultValues?: Partial<FormValues>;
  variant?: "default" | "results"
};

  const trips = [
    { type: "Round trip", icon: <SyncAlt /> },
    { type: "One way", icon: <TrendingFlat /> },
    { type: "Multi-city", icon: <MultipleStop /> },
  ];

export default function SearchForm({ defaultValues, variant= "default" }: SearchFormProps) {
  const [tripAnchor, setTripAnchor] = useState<null | HTMLElement>(null);
  const [passAnchor, setPassAnchor] = useState<null | HTMLElement>(null);
  const [classAnchor, setClassAnchor] = useState<null | HTMLElement>(null);
  const [formValues, setFormValues] = useState<FormValues | null>(null);

  const methods = useForm<FormValues>({
    defaultValues: {
      tripType: "Round trip",
      travelClass: "Economy",
      passengers: { adults: 1, children: 0, infantsSeat: 0, infantsLap: 0 },
      from: "",
      to: "",
      departure: "",
      return: "",
      multiCity: [{ from: "", to: "", departure: "" }],
      ...defaultValues,
    },
  });
  const { handleSubmit, watch, setValue } = methods;

  // watch form values
  const tripType = watch("tripType");
  const travelClass = watch("travelClass");
  const passengers = watch("passengers");
  const totalPassengers =
    passengers.adults +
    passengers.children +
    passengers.infantsSeat +
    passengers.infantsLap;

  const { refetch } = useFlights(formValues!, !!formValues); // only enabled when formValues is set

  const navigate = useNavigate()

  const onSubmit = async (data: FormValues) => {
    const setIsLoading = useFlightStore.getState().setIsLoading;
    setIsLoading(true);
    try {
      setFormValues(data);
      const result = await refetch();
      if (!result.data) throw new Error("No data returned");
      const itineraryId = result.data?.data?.itineraries[0]?.id;
      const sessionId = result.data?.data?.context?.sessionId;
      const legs = [{origin: data.from, destination: data.to, date: data.departure,}];
      const details = await fetchFlightDetails(itineraryId, sessionId, legs);
      console.log("Flight details:", details);
      useFlightStore.getState().setData(result.data.data);
      useFlightStore.getState().setFlightDetails(details);
      navigate("/results");
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const openTripMenu = (e: React.MouseEvent<HTMLElement>) =>
    setTripAnchor(e.currentTarget);
  const closeTripMenu = () => setTripAnchor(null);
  const selectTrip = (t: FormValues["tripType"]) => {
    setValue("tripType", t);
    closeTripMenu();
  };

  const openPassMenu = (e: React.MouseEvent<HTMLElement>) =>
    setPassAnchor(e.currentTarget);
  const closePassMenu = () => setPassAnchor(null);
  const changePassenger = (
    k: keyof FormValues["passengers"],
    delta: number
  ) => {
    const updated = Math.max(0, passengers[k] + delta);
    setValue(`passengers.${k}`, updated);
  };

  const openClassMenu = (e: React.MouseEvent<HTMLElement>) =>
    setClassAnchor(e.currentTarget);
  const closeClassMenu = () => setClassAnchor(null);
  const selectClass = (c: FormValues["travelClass"]) => {
    setValue("travelClass", c);
    closeClassMenu();
  };

  const activeTrip = trips.find((x) => x.type === tripType)!;

  const theme = useTheme()
  const isDark = theme.theme === 'dark';

  return (
    <FormProvider {...methods}>
      <div className={`  w-full   ${ variant === 'default' ? 'md:absolute md:-bottom-[15rem] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%]  bg-white dark:bg-[#36373a] dark:text-[#fff] shadow-lg px-5   max-w-[990px] mx-auto  mt-10' : 'relative border'} rounded-lg flex flex-col justify-center items-center`}>
        <form
          className="flex flex-col  w-full relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Trip Type Selector */}
          <div className="flex items-center w-full ">

            <IconButton
              onClick={openTripMenu}
              size="small"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                display: "flex",
                gap: 1,
                
                width: 200,
               color: isDark ? '#fff' : "#36373a",
                fontSize: "1rem",
                "&:hover": { backgroundColor: "transparent", boxShadow: "none" },
              }}
            >
              {activeTrip.icon}
              <Typography sx={{fontSize: "15px", color: isDark ? '#fff' : "#36373a", fontWeight: "semibold"}}>{tripType}</Typography>
              {tripAnchor ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            <Menu
              anchorEl={tripAnchor}
              open={Boolean(tripAnchor)}
              onClose={closeTripMenu}
              PaperProps={{
                sx: {
                  backgroundColor: "background.paper",
                  color: "text.primary",
                  minWidth: 200,
                  borderRadius: 2,
                  py: 2,
                  boxShadow: 3
                },
              }}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {trips.map((t) => (
                <MenuItem
                  key={t.type}
                  selected={t.type === tripType}
                  onClick={() =>
                    selectTrip(t.type as FormValues["tripType"])
                  }
                  sx={{ fontSize: "1rem", display: "flex", gap: 1, pl: 10,
                    position: 'relative',
                    '&.Mui-selected': {
                      backgroundColor: 'transparent', 
                    },
                    '&:hover': {
                      backgroundColor: 'action.hover', 
                    },}}
                >
                  {t.type === tripType && <Check  sx={{position: 'absolute', left: 16, fontSize:"30px"}} />}
                  {t.type}
                </MenuItem>
              ))}
            </Menu>

            {/* Passenger Selector */}
            <IconButton
              onClick={openPassMenu}
              size="small"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                display: "flex",
                gap: 1,
                width: 50,
                color: isDark ? '#fff' : "#36373a",
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <Person2Outlined />
              <Typography sx={{fontSize: "15px",  color: isDark ? '#fff' : "#36373a", fontWeight: "semibold"}}>{totalPassengers}</Typography>
              {passAnchor ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            <Menu
              anchorEl={passAnchor}
              open={Boolean(passAnchor)}
              onClose={closePassMenu}
              PaperProps={{
                sx: {
                  backgroundColor: "background.paper",
                  color: "text.primary",
                  minWidth: 300,
                  borderRadius: 2,
                  py: 2,
                  px:3,
                  boxShadow: 3,
                },
              }}
            >
              {(
                [
                  ["adults", "Adults"] as const,
                  ["children", "Children"] as const,
                  ["infantsSeat", "Infants (seat)"] as const,
                  ["infantsLap", "Infants (lap)"] as const,
                ] satisfies Array<[keyof FormValues["passengers"], string]>
              ).map(([key, label]) => (
                <MenuItem key={key}   sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Typography>{label}</Typography>
                    <Box display="flex" gap={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        disabled={passengers[key] === 0}
                        onClick={() => changePassenger(key, -1)}
                        sx={{ minWidth: 35 }}
                      >
                        –
                      </Button>
                      <Typography>{passengers[key]}</Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => changePassenger(key, 1)}
                        sx={{ minWidth: 35 }}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
              <Box display="flex" justifyContent="space-between" px={2} pt={2}>
                <Button onClick={closePassMenu}>Cancel</Button>
                <Button onClick={closePassMenu}>Done</Button>
              </Box>
            </Menu>

            {/* Class Selector */}
            <IconButton
              onClick={openClassMenu}
              size="small"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                display: "flex",
                gap: 1,
                color: isDark ? '#fff' : "#36373a",
                width: 180,
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <Typography sx={{fontSize: "15px",  color: isDark ? '#fff' : "#36373a", fontWeight: "semibold"}}>{travelClass}</Typography>
              {classAnchor ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            <Menu
              anchorEl={classAnchor}
              open={Boolean(classAnchor)}
              onClose={closeClassMenu}
              PaperProps={{
                sx: {
                  backgroundColor: "background.paper",
                  color: "text.primary",
                  minWidth: 200,
                  borderRadius: 2,
                  py: 2,
                  boxShadow: 3
                },
              }}
            >
              {(
                [
                  "Economy",
                  "Premium Economy",
                  "Business",
                  "First",
                ] as FormValues["travelClass"][]
              ).map((c) => (
                <MenuItem
                  key={c}
                  selected={c === travelClass}
                  onClick={() => selectClass(c)}
                  sx={{ fontSize: "1rem", display: "flex", gap: 1, pl: 8, 
                  
                    position: 'relative',
                    '&.Mui-selected': {
                      backgroundColor: 'transparent', 
                    },
                    '&:hover': {
                      backgroundColor: 'action.hover', 
                    },}}
                >
                  {c === travelClass && <Check  sx={{
                      position: 'absolute',
                      left: 16,
                      fontSize:"30px"
                    }} />}
                  {c}
                </MenuItem>
              ))}
            </Menu>
          </div>

          {/* Trip-specific inputs */}
          <div className={`w-full ${variant === 'default' ? 'pb-10' : 'border'} `}>
            {tripType === "Round trip" && <RoundTrip />}
            {tripType === "One way" && <OneWay />}
            {tripType === "Multi-city" && <MultiCity />}
          </div>

          {/* Submit */}
          { variant === 'default' && (
            <div className="absolute bottom-[-20px] left-[50%] translate-x-[-50%] w-full">
            <Box mt={4} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                startIcon={<Search />}
                sx={{ px: 4, py: 1.5, borderRadius: '100px', fontWeight: "bold", textTransform: "capitalize", backgroundColor: isDark ? "#8ab4f8" :  "#1a73e8", color:  "#fff"}}
                
              >
                Search
              </Button>
            </Box>
            </div>
          )}
         
        </form>
      </div>
    </FormProvider>
  );
}
