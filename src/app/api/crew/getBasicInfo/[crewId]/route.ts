import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ crewId: string }> }
) {
  const { crewId } = await context.params;

  if (!crewId) {
    return NextResponse.json({ error: "crewId is required" }, { status: 400 });
  }

  const BASE_URL = `${process.env.BASE_URL}/crews/detail`;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "액세스 토큰이 존재하지 않습니다." },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}/${crewId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken};`,
      },
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
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
