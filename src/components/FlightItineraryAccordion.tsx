import type { Itinerary } from '../types';
import { simplifyFlightData } from '../utils/flight';
import { useTheme } from '../context/ThemeContext';
import { SingleItineraryAccordion } from './SingleItineraryAccordion';
import type { FlightSearchData } from '../store/useFlightStore';


export type FlightData = {
departure: {
flightNumber: string;
departureTime: string;
departureDate: string;
};
arrival: {
flightNumber: string;
arrivalTime: string;
arrivalDate: string;
};
layovers: string[];
cost: number;
origin: { city: string; name: string };
destination: { city: string; name: string };
durationInMinutes: number;
};

type Props = {
flightData: FlightData | FlightSearchData;
};

export default function FlightItineraryAccordion({ flightData }: Props) {
  const itineraries: Itinerary[] =
  'itineraries' in flightData && Array.isArray(flightData.itineraries)
    ? flightData.itineraries
    : [];

const theme = useTheme();
const isDark = theme.theme === 'dark';

if (!itineraries.length) {
  // fallback for when it's a single result
  const segmentData = flightData as FlightData;
  return <SingleItineraryAccordion data={segmentData} isDark={isDark} />;
}

return (
  <>
    {itineraries.map((itinerary, index) => {
      const displayData = itinerary.legs[0] as unknown as FlightData;
      const logo = itinerary.legs[0].carriers.marketing[0]?.logoUrl;
      const airlineName = itinerary.legs[0].carriers.marketing[0]?.name;
      const segmentData = simplifyFlightData(itinerary);

      return (
        <SingleItineraryAccordion
          key={index}
          data={segmentData}
          displayData={displayData}
          logo={logo}
          airlineName={airlineName}
          isDark={isDark}
        />
      );
    })}
  </>
);
}