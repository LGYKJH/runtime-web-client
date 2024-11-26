import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies(); // 동기적으로 호출
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // Access Token 또는 Refresh Token이 없으면 로그인 페이지로 리다이렉트
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(
      `https://runtime-web-client.vercel.app/users/login`
    );
  }

  // Validate Token 한 번만 호출
  const validationResponse = await validateAndRefreshToken(
    accessToken,
    refreshToken
  );

  if (!validationResponse.isValid) {
    // 토큰이 유효하지 않으면 로그인 페이지로 리다이렉트
    return NextResponse.redirect(
      `https://runtime-web-client.vercel.app/users/login`
    );
  }

  // 요청을 그대로 전달
  return NextResponse.next();
}

const validateAndRefreshToken = async (
  accessToken: string | undefined,
  refreshToken: string | undefined
) => {
  const BASE_URL = `${process.env.BASE_URL}/auth/validateToken`;

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken || ""}; refresh_token=${
          refreshToken || ""
        };`,
      },
    });

    if (!response.ok) {
      console.error(
        `Token validation failed. HTTP error! status: ${response.status}`
      );
      return { isValid: false };
    }

    const data = await response.json();

    if (data.newAccessToken) {
      // 새로운 Access Token이 발급되었다면 쿠키에 저장
      (await cookies()).set("access_token", data.newAccessToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "none",
      });
    }

    return { isValid: true, newAccessToken: data.newAccessToken };
  } catch (error) {
    console.error("Error during token validation or refresh:", error.message);
    return { isValid: false };
  }
};

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
