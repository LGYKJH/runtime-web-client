
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";


export async function GET(request: NextRequest) {
  const BASE_URL = `${process.env.BASE_URL}/users/detail`;

  try {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    console.log("Access Token:", accessToken);

    if (!accessToken) {
      return NextResponse.json(
        { error: "access 토큰이 존재하지 않습니다." },
        { status: 400 }
      );
    }

    // 백엔드 요청
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken};`,
      },
      
    });


    const userData = await response.json();

    console.log(userData);
    return NextResponse.json(userData);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    console.error("Next.js API 라우트 에러:", error.message);
    return NextResponse.json(
      { error: "유저 데이터 로드 실패", details: error.message },
      { status: 500 }
    );
  }
}