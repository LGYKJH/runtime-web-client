import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASE_URL = `${process.env.BASE_URL}/users/logout`;

  try {
    // 백엔드로 POST 요청 보내기 (로그아웃 요청)
    const response = await fetch(BASE_URL, {
      method: "GET", // 로그아웃 요청은 POST 메서드로 설정
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // 백엔드 요청 실패 시 에러 처리
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    // 백엔드 응답 성공 시 데이터 가져오기
    const responseData = await response.json();

    // 쿠키 출력 확인
    const cookies = response.headers.get("set-cookie");
    console.log("쿠키 확인: ", cookies);

    // 클라이언트로 성공 응답 전송
    return NextResponse.json(
      { message: "로그아웃 성공", data: responseData },
      { headers: { "Set-Cookie": cookies || "" } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
