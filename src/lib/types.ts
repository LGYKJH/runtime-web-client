// 로그인 폼 타입
export type LoginFormType = {
  email: string;
  password: string;
};

// 회원가입 폼 타입
export type RegisterFormType = {
  userEmail: string;
  userPassword: string;
  userName: string;
  userNickname: string;
  userGender: number;
  userBirth: string;
  userAddress: string;
  userGoal: string;
  userPreference: string[];
};

// 유효성 검사 에러 메시지 타입
export type ErrorMessage = {
  [key: string]: string;
};
