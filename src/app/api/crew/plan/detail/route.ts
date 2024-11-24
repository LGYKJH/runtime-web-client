import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { crewId } = await request.json();
  if (!crewId) {
    return NextResponse.json(
      { message: "crewId가 필요합니다." },
      { status: 400 }
    );
  }
  const BASE_URL = `${process.env.BASE_URL}/crews/plan/detail?crewId=${crewId}`;

  try {
    // 백엔드 호출
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: `Spring 서버 에러: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("API 호출 에러:", error);
    return NextResponse.json(
      { message: "서버 요청 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
