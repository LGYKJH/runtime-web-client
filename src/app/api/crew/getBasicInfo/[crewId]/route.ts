import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { crewId?: string } }
) {
  const { crewId } = params;

  if (!crewId) {
    return NextResponse.json({ error: "crewId is required" }, { status: 400 });
  }

  const BASE_URL = `${process.env.BASE_URL}/crews/detail`;

  try {
    const response = await fetch(`${BASE_URL}/${crewId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
