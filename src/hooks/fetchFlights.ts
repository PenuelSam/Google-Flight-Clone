import { useFlightStore } from "../store/useFlightStore";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FormValues = {
  from: string; // IATA code e.g., 'JFK'
  to: string;   // IATA code e.g., 'LAX'
  departure: string; // 'YYYY-MM-DD'
  return: string;    // Optional for one-way
  travelClass: string;  // 'economy' | 'business' | etc.
  passengers: {
    adults: number;
    children: number;
    infantsLap: number;
    infantsSeat: number;
  };
};

type FlightParams = {
  entityId: string;
  skyId: string;
};

type Leg = {
  origin: string;
  destination: string;
  date: string; // 'YYYY-MM-DD'
};

export const fetchFlightDetails = async (
  itineraryId: string,
  sessionId: string,
  legs: Leg[]
) => {
  const baseUrl = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails';

  const queryParams = new URLSearchParams({
    itineraryId,
    sessionId,
    legs: JSON.stringify(legs),
    adults: '1', // set your own values if dynamic
    currency: 'USD',
    locale: 'en-US',
    market: 'en-US',
    cabinClass: 'economy',
    countryCode: 'US',
  });

  const url = `${baseUrl}?${queryParams.toString()}`;

  const options: RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
      'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
    },
  };

  try {
    console.log(`🔍 Fetching flight details (GET) for ID: ${itineraryId}`);
    console.log(`🌐 Request URL: ${url}`);
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    console.log('📦 Flight detail result:', data);
    return data;
  } catch (err) {
    console.error('❌ Failed to fetch flight details (GET):', err);
    throw err;
  }
};


async function fetchEntityDetails(iataCode: string): Promise<FlightParams | null> {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${iataCode}&locale=en-US`;

  const options: RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
      'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    const airports = json.data;

    console.log(`🔍 Search results for: ${iataCode}`);
    console.log('Full airport data:', airports);

    // Try to get the most appropriate airport/city
    const valid = airports.find((item: any) => 
      item.navigation?.relevantFlightParams?.skyId &&
      item.navigation?.relevantFlightParams?.entityId
    );

    if (!valid) {
      console.warn(`⚠️ No valid skyId/entityId found for IATA code: ${iataCode}`);
      return null;
    }

    const params = valid.navigation.relevantFlightParams;
    console.log(`✅ Selected for ${iataCode}:`, params);

    useFlightStore.getState().setEntityDetails(params)

    return {
      entityId: params.entityId,
      skyId: params.skyId,
    };

  } catch (error) {
    console.error(`❌ Failed to fetch entity info for ${iataCode}:`, error);
    return null;
  }
}


export const fetchFlights = async (formData: FormValues) => {
  const {
    from,
    to,
    departure,
    return: returnDate,
    travelClass,
    passengers,
  } = formData;

  const origin = await fetchEntityDetails(from);
  const destination = await fetchEntityDetails(to);

  if (!origin || !destination) {
    throw new Error('Failed to retrieve valid skyId/entityId for origin or destination.');
  }

  console.log('🛫 Origin:', origin);
  console.log('🛬 Destination:', destination);

  const queryParams = new URLSearchParams({
    originSkyId: origin.skyId,
    destinationSkyId: destination.skyId,
    originEntityId: origin.entityId,
    destinationEntityId: destination.entityId,
    date: departure,
    cabinClass: travelClass.toLowerCase(),
    adults: passengers.adults.toString(),
    currency: 'USD',
    sortBy: 'best',
    market: 'en-US',
    countryCode: 'US',
  });

  if (returnDate) queryParams.set('returnDate', returnDate);

  const options: RequestInit = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ef28b3b778msha32a8d3ad262dabp16fe9cjsn2b06ac25740e',
      'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
    },
  };

  try {
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?${queryParams}`;
    console.log(`📡 Fetching flights from: ${url}`);
    
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    console.log('✈️ Flight results:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to fetch flights:', error);
    throw error;
  }
};
