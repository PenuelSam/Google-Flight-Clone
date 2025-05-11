export type FlightSearchData = {
    context: {
      status: string;
      sessionId: string;
      totalResults: number;
    };
    itineraries: Itinerary[];
  };
  
  export type Itinerary = {
    id: string;
    price: {
      raw: number;
      formatted: string;
      pricingOptionId: string;
    };
    legs: Leg[];
    isSelfTransfer: boolean;
    isProtectedSelfTransfer: boolean;
    farePolicy: {
      isChangeAllowed: boolean;
      isPartiallyChangeable: boolean;
      isCancellationAllowed: boolean;
      isPartiallyRefundable: boolean;
    };
    fareAttributes: Record<string, unknown>;
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
  };
  
  export type Leg = {
    id: string;
    origin: Airport;
    destination: Airport;
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: {
      marketing: Carrier[];
      operationType: string;
    };
    segments: Segment[];
  };
  
  export type Airport = {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
    isHighlighted: boolean;
  };
  
  export type Carrier = {
    id: number;
    alternateId: string;
    logoUrl: string;
    name: string;
  };
  
  export type Segment = {
    id: string;
    origin: Place;
    destination: Place;
    departure: string;
    arrival: string;
    durationInMinutes: number;
    flightNumber: string;
    marketingCarrier: Airline;
    operatingCarrier: Airline;
  };
  
  export type Place = {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: string;
    };
    name: string;
    type: string;
    country: string;
  };
  
  export type Airline = {
    id: number;
    name: string;
    alternateId: string;
    allianceId: number;
    displayCode: string;
  };

  export type FormValues = {
    tripType: "Round trip" | "One way" | "Multi-city";
    travelClass: "Economy" | "Premium Economy" | "Business" | "First";
    passengers: {
      adults: number;
      children: number;
      infantsSeat: number;
      infantsLap: number;
    };
    from: string;
    to: string;
    departure: string;
    return: string;
    multiCity: Array<{ from: string; to: string; departure: string }>;
  };
  