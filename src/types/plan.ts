import { Activity } from './activity';
import { Location } from './location';
import { PlanStatus } from './plan-status';

export type Plan = {
  id: string;
  note: string;
  start_date: Date;
  status: PlanStatus;
  destination: Location;
  activities: Activity[];
};
