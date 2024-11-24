import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const BASE_URL = `${process.env.BASE_URL}/crews/plan/create`;

  try {
    const body = await request.json();

    // Validate incoming data
    if (
      !body.category ||
      !body.place ||
      !body.startTime ||
      !body.selectedDate
    ) {
      return NextResponse.json(
        { message: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    // Transform the data to match the Spring backend DTO
    const crewPlanData = {
      crewPlanContent: body.category, // 카테고리 값을 콘텐츠로 사용
      crewPlanPlace: body.place,
      crewPlanStartDt: `${body.selectedDate}T${body.startTime}`,
      crewPlanEndDt: body.endTime
        ? `${body.selectedDate}T${body.endTime}`
        : null,
      crewPlanIsRegular: body.category === "Regular Meeting" ? 1 : 0,
      crewPlanStatus: "ACTIVE", // 기본 상태를 ACTIVE로 설정
      crewId: 1, // 예시: 특정 Crew ID를 하드코딩하거나 전달받을 수 있음
      crewPlanCreatedDt: new Date().toISOString(),
    };

    // Send data to the Spring backend
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crewPlanData),
    });

    // Handle Spring backend response
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: "이벤트가 성공적으로 추가되었습니다.", data: responseData },
        { status: 200 }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: `Spring 서버 에러: ${errorData.message}` },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("서버 에러:", error);
    return NextResponse.json(
      { message: "서버 에러가 발생했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
