import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASE_URL = `${process.env.BASE_URL}/users/login`;

  try {
    const { email, password } = await request.json();

    const apiUrl = `${BASE_URL}/user/login`;

    const body = { userId: email, userPw: password };

    // 외부 API에 로그인 요청을 프록시하는 코드
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("Content-Type");

    let responseData;
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!responseData.result) {
      const errorMessage =
        typeof responseData === "object"
          ? JSON.stringify(responseData)
          : responseData;

      return NextResponse.json(
        { error: "Error: " + errorMessage },
        { status: response.status }
      );
    }

    // 외부 API 응답을 그대로 반환
    return NextResponse.json(
      {
        message: "로그인이 성공했습니다.",
        data: responseData,
      },
      { status: 200 }
    );
  } catch (error) {
    // error가 Error 타입인지 확인하여 안전하게 message를 접근
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    return NextResponse.json(
      { error: "로그인 중 오류가 발생했습니다 : " + errorMessage },
      { status: 500 }
    );
  }
}
