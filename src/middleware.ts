import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/users/login", request.url));
  }

  // // accessToken이 있으면 API로 검증 요청
  // const isValidToken = validateToken(accessToken);

  // if (!isValidToken) {
  //   // 토큰이 유효하지 않으면 로그인 페이지로 리다이렉트
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // 유효한 경우 요청을 그대로 전달
  return NextResponse.next();
}

// const validateToken = async (token: string) => {
//   const BASE_URL = `${process.env.BASE_URL}/auth/validateToken`;

//   try {
//     const response = await fetch(BASE_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {}
// };

// // 토큰 검증 함수 (예제: 실제 검증 API 호출 가능)
// function validateToken(token: string): boolean {
//   // 여기서 서버 요청을 통해 검증할 수도 있습니다.
//   // 예를 들어, fetch 요청을 통해 서버에 유효성을 확인 가능.
//   try {
//     // JWT 디코딩 및 간단한 유효성 체크 (실제 검증은 서버에서 처리)
//     const decoded = JSON.parse(atob(token.split(".")[1]));
//     const now = Math.floor(Date.now() / 1000);
//     return decoded.exp > now; // 토큰이 만료되지 않은 경우
//   } catch (error) {
//     console.error("토큰 검증 실패:", error);
//     return false;
//   }
// }

export const config = {
  matcher: ["/dashboard/:path*"],
};
