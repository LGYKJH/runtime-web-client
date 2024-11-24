import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const BASE_URL = `${process.env.BASE_URL}/crews`;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const userId = cookieStore.get("user_id")?.value;

    if (!accessToken || !userId) {
      return NextResponse.json(
        { error: "토큰 또는 userId가 존재하지 않습니다." },
        { status: 400 }
      );
    }

    // API 요청: 사용자가 속한 모든 크루 ID와 역할
    const userCrewsResponse = await fetch(`${BASE_URL}/myCrew/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken};`,
      },
      credentials: "include",
    });

    if (!userCrewsResponse.ok) {
      const errorData = await userCrewsResponse.json();
      return NextResponse.json(
        { error: errorData },
        { status: userCrewsResponse.status }
      );
    }

    const userCrewsData = await userCrewsResponse.json();

    return NextResponse.json(userCrewsData);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    console.error("Fetch failed:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
