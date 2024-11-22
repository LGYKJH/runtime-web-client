// app/api/users/register/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const BASE_URL = `${process.env.BASE_URL}`;
  const apiUrl = `${BASE_URL}/users/register`;

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

    const responseData = await response.json();

    if (responseData.result === false) {
      return NextResponse.json(
        { error: responseData.message || "회원가입 실패" },
        { status: 400 }
      );
    }

    // 서버 응답에서 결과 확인 및 에러 처리
    return NextResponse.json(
      {
        success: true,
        message: "회원가입이 성공했습니다.",

      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `회원가입 중 오류 발생: ${error.message}` },
      { status: 500 }
    );
  }
}
