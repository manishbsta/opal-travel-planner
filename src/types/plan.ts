import { Activity } from './activity';
import { Location } from './location';

export type Plan = {
  id: string;
  note: string;
  start_date: Date;
  start_point: Location;
  destination: Location;
  activities: Activity[];
};
