export interface CrewPlans {
  crewPlanId: number;
  crewId: number;
  crewPlan: string;
  crewPlanStartDt: string; 
  crewPlanEndDt: string | null; 
  crewPlanContent: string;
  cewPlanStatus: number;
  crewPlanPlace: string | null;
  crewPlanIsRegular: number;
}