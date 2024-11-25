import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const BASE_URL = `${process.env.BASE_URL}/crews/waiting`;

  try {
    const { crewMemberId } = await request.json();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "액세스 토큰이 존재하지 않습니다." },
        { status: 400 }
      );
    }

    const body = {
      crewMemberId: crewMemberId,
    };

    // 백엔드 요청
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken};`,
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
