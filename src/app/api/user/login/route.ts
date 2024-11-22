import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const BASE_URL = `${process.env.BASE_URL}/auth/login`;

  try {
    const { email, password } = await request.json();
    const body = { userEmail: email, userPassword: password };

    // 백엔드 요청
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const responseData = await response.json();

    // Set-Cookie 헤더에서 쿠키 읽기
    const setCookieHeader = response.headers.get("set-cookie");
    console.log("Set-Cookie 헤더:", setCookieHeader);

    if (setCookieHeader) {
      const cookieStore = cookies();

      // 여러 쿠키가 있을 경우 각각 처리
      const cookieList = setCookieHeader.split(", ");
      for (const cookieString of cookieList) {
        const [cookiePart] = cookieString.split(";");
        const [name, value] = cookiePart.split("=");

        if (name && value) {
          let maxAge = undefined;

          if (name.trim() === "refresh_token") {
            maxAge = 604800;
          }

          // 쿠키 설정
          (await cookieStore).set(name.trim(), value.trim(), {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "none",
            maxAge,
          });
        }
      }
    }

    return NextResponse.json(responseData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
