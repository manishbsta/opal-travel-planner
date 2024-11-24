import { PlanStatus } from '@src/types/plan-status';

export const getStatusColor = (status: PlanStatus) => {
  switch (status) {
    case PlanStatus.Completed:
      return '#4CAF50';
    case PlanStatus.Upcoming:
      return '#2196F3';
    case PlanStatus.InProgress:
      return '#FF9800';
    case PlanStatus.Canceled:
      return '#F44336';
  }
};
