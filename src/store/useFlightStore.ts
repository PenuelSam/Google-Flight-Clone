import { create } from "zustand";

type PassengerCounts = {
  adults: number;
  children: number;
  infantsSeat: number;
  infantsLap: number;
};

type TripType = "Round trip" | "One way" | "Multi-city";
type TravelClass = "Economy" | "Premium Economy" | "Business" | "First";

export type FlightSearchData = {
  tripType: TripType;
  travelClass: TravelClass;
  passengers: PassengerCounts;
  from: string;
  to: string;
  departure: string;
  return: string;
  multiCity: Array<{ from: string; to: string; departure: string }>;
  itineraries?: unknown;
  arrival?: string | null;
  layovers?: string[];
  cost?: number;
  origin?: string;
  destination?: string;
};



type FlightStore = {
  data: FlightSearchData | null;
  flightDetails: Record<string, string | number | boolean> | null;
  entityDetails: Record<string, string | number | boolean> | null;
  isLoading: boolean;
  setData: (formData: FlightSearchData) => void;
  setFlightDetails: (details: Record<string, string | number | boolean>) => void;
  setEntityDetails: (details: Record<string, string | number | boolean>) => void;
  setIsLoading: (loading: boolean) => void;
  clearData: () => void;
};

export const useFlightStore = create<FlightStore>((set) => ({
  data: null,
  flightDetails: null,
  entityDetails: null,
  isLoading: false,
  setEntityDetails: (details) => set({ entityDetails: details }),
  setData: (formData) => set({ data: formData }),
  setFlightDetails: (details) => set({ flightDetails: details }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  clearData: () => set({ data: null }),
}));
