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
  crewMemberConfirmedDt: string | null; // nullable for unconfirmed members

  // 사용자 정보
  userEmail: string;
  userName: string;
  userNickname: string;
  userGender: number; // assuming 1 for male, 2 for female
  userBirth: string; // formatted as YYYYMMDD
  userAddress: string;
  userGoal: string;
  userPreference: string; // comma-separated preferences
  userProfile: string | null; // URL or null if no profile image
}
