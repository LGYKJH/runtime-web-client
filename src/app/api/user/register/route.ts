// app/api/users/register/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASE_URL = `${process.env.BASE_URL}`;

  try {
    // 클라이언트 요청에서 필요한 데이터 추출
    const requestData = await request.json();
    const {
      userEmail,
      userPassword,
      userName,
      userNickname,
      userGender,
      userBirth,
      userAddress,
      userGoal,
      userPreference,
    } = requestData;

    // userBirth 변환 (YYYY-MM-DD -> YYYYMMDD)
    const formattedBirth =
      userBirth && typeof userBirth === "string"
        ? userBirth.replace(/-/g, "") // 하이픈(-) 제거
        : null;

    // 서버에 전달할 회원가입 데이터 구성
    const apiUrl = `${BASE_URL}/users/register`;

    const currentDate = new Date()
      .toLocaleString("sv-SE", { timeZone: "UTC" })
      .replace(" ", "T");

    const body = {
      userEmail: userEmail, // 정상적으로 받은 데이터를 매핑
      userPassword: userPassword,
      userName: userName,
      userNickname: userNickname,
      userGender: userGender,
      userBirth: formattedBirth,
      userAddress: userAddress,
      userGoal: userGoal,
      userPreference: userPreference,
      userCreatedDt: currentDate, // 현재 시각
      userUpdatedDt: currentDate, // 현재 시각
      userOauthId: null, // 기본값
      userProfile: null, // 기본값
      userEmailIsAuthenticated: 1, // 기본값
    };

    console.log("출력: " + JSON.stringify(body));

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

    /*  return NextResponse.json(
      { message: "회원가입이 성공했습니다.", data: responseData },
      { status: 200 }
    ); */
    // 회원가입 성공 -> 리다이렉션
    return NextResponse.redirect(new URL("/users/login", request.url));
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
