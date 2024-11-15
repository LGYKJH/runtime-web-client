import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASE_URL = `${process.env.BASE_URL}/users/login`;

  try {
    const { email, password } = await request.json();
    const body = { userId: 1, userEmail: email, userPassword: password };

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json({ message: "로그인 성공", data: responseData });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
