import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest, context: { params: Promise<{ crewId: string }> }) {
  const { crewId } = await context.params;

  if (!crewId) {
    return NextResponse.json({ error: "crewId is required" }, { status: 400 });
  }

  const BASE_URL = `${process.env.BASE_URL}/crews/members`;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    console.log("Fetching crew members:", { crewId, url: `${BASE_URL}/${crewId}` });

    if (!accessToken) {
      return NextResponse.json({ error: "토큰이 존재하지 않습니다." }, { status: 400 });
    }

    const response = await fetch(`${BASE_URL}/${crewId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken};`,
      },
    });

    console.log("Response status:", response.status);

    const responseText = await response.text();
    console.log("Response body as text:", responseText);

    if (!response.ok) {
      console.error("Error response received:", responseText);
      return NextResponse.json({ error: JSON.parse(responseText) }, { status: response.status });
    }

    const responseData = JSON.parse(responseText);
    console.log("Parsed response data:", responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    console.error("Fetch failed:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
