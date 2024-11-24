import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CrewMember } from "@/app/types/crew";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ crewId: string }> }
) {
  const { crewId } = await context.params;

  if (!crewId) {
    return NextResponse.json({ error: "crewId is required" }, { status: 400 });
  }

  const BASE_URL = `${process.env.BASE_URL}/crews`;

  try {
    const cookieStore = await cookies();
    console.log("Received Cookies:", cookieStore.getAll());
    const accessToken = cookieStore.get("access_token")?.value;

    const userId = cookieStore.get("user_id")?.value;

    if (!accessToken || !userId) {
      return NextResponse.json(
        { error: "토큰 또는 userId가 존재하지 않습니다." },
        { status: 400 }
      );
    }

    // 1. members/[crewId] 요청
    const [membersResponse, waitingResponse] = await Promise.all([
      fetch(`${BASE_URL}/members/${crewId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${accessToken};`,
        },
        credentials: "include",
      }),
      fetch(`${BASE_URL}/waiting/${crewId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${accessToken};`,
        },
        credentials: "include",
      }),
    ]);

    if (!membersResponse.ok) {
      const errorData = await membersResponse.json();
      return NextResponse.json(
        { error: errorData },
        { status: membersResponse.status }
      );
    }

    if (!waitingResponse.ok) {
      const errorData = await waitingResponse.json();
      return NextResponse.json(
        { error: errorData },
        { status: waitingResponse.status }
      );
    }

    const membersData: CrewMember[] = await membersResponse.json();
    const waitingData: CrewMember[] = await waitingResponse.json();

    const currentMemberNumber = membersData.length;

    // 2. userId가 있는 멤버 찾기
    const userMember = membersData.find(
      (member) => member.userId === parseInt(userId, 10)
    );
    const waitingMember = waitingData.find(
      (member) => member.userId === parseInt(userId, 10)
    );

    const isUserInCrew = Boolean(userMember);
    const isUserInWaiting = Boolean(waitingMember);

    let userRole = 4;
    if (isUserInCrew) {
      userRole = userMember?.crewMemberRole; // 역할 (1=리더, 2=멤버, 3=대기자)
    } else {
      if (isUserInWaiting) {
        userRole = waitingMember?.crewMemberRole;
      }
    }

    console.log("Is user in crew:", isUserInCrew);
    console.log("User role:", userRole);

    let combinedData: CrewMember[] = [];

    // 3. 역할에 따른 데이터 반환
    if (userRole == 1) {
      // 리더: 대기자와 멤버 모두 반환
      combinedData = [...waitingData, ...membersData];
    } else if (userRole == 3) {
      // 대기자: 대기자 전체와 자신의 데이터만 반환
      combinedData = [
        ...waitingData.filter(
          (member) => member.userId === parseInt(userId, 10)
        ),
        ...membersData,
      ];
    } else {
      combinedData = membersData;
    }

    // 4. 응답 반환
    return NextResponse.json({
      combinedData,
      isUserInCrew,
      isUserInWaiting,
      userRole,
      currentMemberNumber,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    console.error("Fetch failed:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
