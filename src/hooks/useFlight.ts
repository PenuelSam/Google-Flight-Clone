import { useQuery } from '@tanstack/react-query';
import { fetchFlights, type FormValues } from './fetchFlights';

export const useFlights = (formData: FormValues, enabled = true) => {
  return useQuery({
    queryKey: ['flights', formData],
    queryFn: () => fetchFlights(formData),
    enabled, // disable automatic fetch until form is submitted
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: 1,
  });
};
