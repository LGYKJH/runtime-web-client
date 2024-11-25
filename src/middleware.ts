import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  // const accessToken = cookieStore.get("access_token")?.value;
  const accessToken = "1234123412341234";
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // if (!accessToken) {
  //   return NextResponse.redirect(`${process.env.BASE_URL}/users/login`);
  // }

  const isValidToken = await validateToken(accessToken, refreshToken);

  // if (!isValidToken) {
  //   return NextResponse.redirect(`${process.env.BASE_URL}/users/login`);
  // }

  // 유효한 경우 요청을 그대로 전달
  return NextResponse.next();
}

const validateToken = async (accessToken: string, refreshToken: string) => {
  const BASE_URL = `${process.env.BASE_URL}/auth/validateToken`;

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken}; refresh_token=${refreshToken};`,
      },
    });

    if (response.status === 401) {
      console.error("Access token expired. Refreshing token...");
      const refreshResponse = await refreshAccessToken(refreshToken);
      return refreshResponse;
    }

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return false;
    }

    const data = await response.json();
    return data.newAccessTokenIssued || false;
  } catch (error) {
    console.error("Error validating token:", error.message);
    return false;
  }
};

const refreshAccessToken = async (refreshToken: string) => {
  const BASE_URL = `${process.env.BASE_URL}/auth/validateToken`;

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refresh_token=${refreshToken};`,
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to refresh token. HTTP error! status: ${response.status}`
      );
      return false;
    }

    const data = await response.json();

    if (data.newAccessToken) {
      console.log("New Access Token Issued:", data.newAccessToken);

      // Create a new response to set cookies
      const response = NextResponse.next();
      response.cookies.set("access_token", data.newAccessToken, {
        httpOnly: true,
      });
      response.cookies.set("refresh_token", data.newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    return false;
  }
};

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
