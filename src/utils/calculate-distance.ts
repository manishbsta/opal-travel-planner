import { getDistance } from 'geolib';

type Coordinate = {
  lat: number;
  lng: number;
};

// calculates the distance in Kilometer
export const calculateDistance = (coord1: Coordinate, coord2: Coordinate) => {
  const distanceInMeter = getDistance(coord1, coord2);
  const distanceInKm = distanceInMeter / 1000;

  const roundedDistance = distanceInKm.toFixed(1);
  return +roundedDistance;
};
