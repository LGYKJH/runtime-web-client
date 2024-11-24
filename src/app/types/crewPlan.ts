export interface CrewPlan {
  crewPlanId: number;
  crewId: number;
  crewPlanContent: string;
  crewPlanStartDt: string;
  crewPlanEndDt?: string;
  crewPlanSelectedDate: string;
  crewPlanPlace: string;
  crewPlanIsRegular: number;
}
