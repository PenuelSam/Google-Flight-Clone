import { useState } from "react";
import FlightFilters from "../components/FlightFilters";
import FlightItineraryAccordion from "../components/FlightItineraryAccordion";
import SearchForm from "../components/SearchForm";
import { useFlightStore } from "../store/useFlightStore";
import { Pagination } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import EmptyFlight from "../components/EmptyFlight";



export const FlightResults = () => {

const [page, setPage] = useState(1);
const flightsPerPage = 5; 
const flightData = useFlightStore((state) => state.data);


let paginatedData = null;
if (flightData && 'itineraries' in flightData && Array.isArray(flightData.itineraries)) {
  const start = (page - 1) * flightsPerPage;
  const end = start + flightsPerPage;
  paginatedData = {
    ...flightData,
    itineraries: flightData.itineraries.slice(start, end),
  };
}

const theme = useTheme();
const isDark = theme.theme === "dark";

  return (
    <div className="max-w-[1200px] mx-auto w-full   mt-32">
        <SearchForm defaultValues={flightData || undefined} variant="results"/>
        <FlightFilters  />

        
      {flightData ? (
        <>
        <FlightItineraryAccordion flightData={paginatedData || flightData} />

        <div className="flex justify-center mt-6">
      <Pagination
        count={Math.ceil(
          ('itineraries' in flightData && Array.isArray(flightData.itineraries) && flightData.itineraries.length / flightsPerPage) || 1
        )}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            color: isDark ? "#fff" : "#333",
            borderColor: isDark ? "#444" : "#ccc",
          },
          "& .Mui-selected": {
            backgroundColor: isDark ? "#333" : "#8ab4f857",
            color: isDark ? "#fff" : "#fff",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: isDark ? "#444" : "#f0f0f0",
          },
        }}
      />
    </div>
        </>
      ) : (
        <EmptyFlight />
      )}
    </div>
  );
};


 {/*  */}