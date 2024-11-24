export interface CrewPlan {
  crewPlanId: number;
  crewId: number;
  crewPlanContent: string;
  crewPlanStartDt: string;
  crewPlanEndDt?: string;
  crewPlanStatus: number;
  crewPlanSelectedDate: string;
  crewPlanPlace?: string;
  crewPlanIsRegular: number;
  crewPlanCreatedDt: string;
  crewPlanUpdatedDt?: string;
}
