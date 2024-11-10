// app/api/users/register/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASE_URL = `${process.env.BASE_URL}/users/login`;

  try {
    // 클라이언트 요청에서 필요한 데이터 추출
    const {
      email,
      password,
      name,
      nickname,
      gender,
      birth,
      address,
      goal,
      preference,
    } = await request.json();

    // 서버에 전달할 회원가입 데이터 구성
    const apiUrl = `${BASE_URL}/user/sign-up`;

    const body = {
      userEmail: email, // 클라이언트 요청의 `email`을 DTO의 `userEmail`에 매핑
      userPassword: password, // 클라이언트 요청의 `password`를 `userPassword`에 매핑
      userName: name, // 클라이언트 요청의 `name`을 `userName`에 매핑
      userNickname: nickname, // 클라이언트 요청의 `nickname`을 `userNickname`에 매핑
      userGender: gender, // 클라이언트 요청의 `gender`를 `userGender`에 매핑
      userBirth: birth, // 클라이언트 요청의 `birth`를 `userBirth`에 매핑
      userAddress: address, // 클라이언트 요청의 `address`를 `userAddress`에 매핑
      userGoal: goal, // 클라이언트 요청의 `goal`을 `userGoal`에 매핑
      userPreference: preference, // 클라이언트 요청의 `preference`를 `userPreference`에 매핑
      userCreatedDt: new Date().toISOString(), // 현재 시각을 `userCreatedDt`로 설정
      userUpdatedDt: new Date().toISOString(), // 현재 시각을 `userUpdatedDt`로 설정
      userEmailIsAuthenticated: 0, // 이메일 인증 여부 기본값 설정
    };

    // API 요청
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("Content-Type");
    let responseData;

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    // 서버 응답에서 결과 확인 및 에러 처리
    if (responseData && responseData.result === false) {
      const errorCode = responseData.error_code || "Unknown error code";
      const errorMessage = responseData.message || "Unknown error occurred";

      return NextResponse.json(
        { error: `Error: ${errorMessage} (Code: ${errorCode})` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "회원가입이 성공했습니다.", data: responseData },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    return NextResponse.json(
      { error: "회원가입 중 오류가 발생했습니다: " + errorMessage },
      { status: 500 }
    );
  }
}
