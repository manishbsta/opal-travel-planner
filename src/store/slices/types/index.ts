import { Location } from '@src/types/location';
import { Plan } from '@src/types/plan';

export type AppState = {
  plans: Plan[];
  destination?: Location;
};
