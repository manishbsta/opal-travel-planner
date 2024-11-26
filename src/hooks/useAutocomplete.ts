import { Urls } from '@src/core/constants/urls';
import { Location } from '@src/types/location';
import axios, { isAxiosError } from 'axios';
import { useCallback, useState } from 'react';

export const useAutocomplete = () => {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchPlaces = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    const results: Location[] = [];
    try {
      const response = await axios.get(Urls.geoApifyAutocomplete, {
        params: {
          text: query,
          apiKey: '1dac3902cd1b49c6a38c5ab4da48ce9c',
          format: 'json',
          type: 'city',
        },
      });

      const apiResults = response.data.results as any[];
      for (const element of apiResults) {
        results.push({
          id: element.place_id,
          name: element.formatted,
          plus_code: element.plus_code,
          latitude: element.lat,
          longitude: element.lon,
        });
      }

      setLocations(results);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      }

      setError('An error occurred while fetching locations.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    locations,
    error,
    searchPlaces,
  };
};
