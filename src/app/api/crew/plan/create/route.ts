import { NextResponse } from "next/server";

// Helper function to format Date to 'YYYY-MM-DDTHH:mm:ss'
const formatDateToLocalDateTime = (date) => {
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};

export async function POST(request: Request) {
  const BASE_URL = `${process.env.BASE_URL}/crews/plan/create`;

  try {
    const body = await request.json();

    // body 내용을 console.log로 출력
    console.log("Request body:", body);

    // Validate incoming data
    if (
      !body.crewPlanContent || // 카테고리
      !body.crewPlanPlace || // 장소
      !body.crewPlanStartDt || // 시작 날짜+시간
      body.crewPlanEndDt === undefined // 종료 날짜+시간 (null도 허용)
    ) {
      return NextResponse.json(
        { message: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    console.log("중간서버 crewPlanselectedDate :" + body.crewPlanSelectedDate);

    // Transform the data to match the Spring backend DTO
    const crewPlanData = {
      crewId: isNaN(body.crewId) ? parseFloat(body.crewId) : body.crewId,
      crewPlanContent: body.crewPlanContent,
      crewPlanStartDt: body.crewPlanStartDt,
      crewPlanEndDt: body.crewPlanEndDt,
      crewPlanSelectedDate: body.crewPlanSelectedDate,
      crewPlanStatus: 1, // 기본 상태를 1(하는 중)으로 설정
      crewPlanPlace: body.crewPlanPlace,
      crewPlanIsRegular: body.crewPlanIsRegular,
      crewPlanCreatedDt: formatDateToLocalDateTime(new Date()),
    };

    console.log("Transformed crewPlanData:", crewPlanData);

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
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        return NextResponse.json(
          { message: `Spring 서버 에러: ${errorData.message}` },
          { status: response.status }
        );
      } else {
        const errorText = await response.text();
        return NextResponse.json(
          { message: `Spring 서버 에러: ${errorText}` },
          { status: response.status }
        );
      }
    }
  } catch (error) {
    console.error("서버 에러:", error);
    return NextResponse.json(
      { message: "서버 에러가 발생했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
