
import type { FlightData } from '../components/FlightItineraryAccordion';
import type { Itinerary } from '../types';

export const simplifyFlightData = (itinerary: Itinerary): FlightData => {
    const leg = itinerary.legs[0];
    const segment = leg.segments[0];
  
    return {
      departure: {
        flightNumber: segment.flightNumber,
        departureTime: new Date(segment.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        departureDate: new Date(segment.departure).toLocaleDateString(),
      },
      arrival: {
        flightNumber: segment.flightNumber,
        arrivalTime: new Date(segment.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        arrivalDate: new Date(segment.arrival).toLocaleDateString(),
      },
      layovers: leg.stopCount > 0 ? leg.segments.slice(1).map(s => s.origin.name) : [],
      cost: itinerary.price.raw,
      origin: {
        city: leg.origin.city,
        name: leg.origin.name,
      },
      destination: {
        city: leg.destination.city,
        name: leg.destination.name,
      },
      durationInMinutes: leg.durationInMinutes,
    };
  };
  
