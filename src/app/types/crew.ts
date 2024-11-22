export interface Crew {
  crewId: number;
  crewName: string;
  crewType: string;
  crewSize: number;
  crewGoal: string;
  crewCalendarTitle: string;
  crewPlace: string;
  crewProfileImage: string;
  crewCreatedDt: string;
  crewUpdatedDt: string;
}

export interface CrewMember {
  crewMemberId: number;
  userId: number;
  crewId: number;
  crewMemberRole: number;
  crewMemberJoinDt: string;
  crewMemberConfirmedDt: string;
}
