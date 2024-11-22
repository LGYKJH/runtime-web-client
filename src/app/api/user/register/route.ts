import { NextResponse, NextRequest } from "next/server";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../firebaseConfig";

export async function POST(request: NextRequest) {
  try {
    // `multipart/form-data`로 전달된 데이터 파싱
    const formData = await request.formData();

    // 데이터 추출 및 검증
    const userEmail = formData.get("userEmail") as string | null;
    const userPassword = formData.get("userPassword") as string | null;
    const userName = formData.get("userName") as string | null;
    const userNickname = formData.get("userNickname") as string | null;
    const userGender = formData.get("userGender") as string | null;
    const userBirth = formData.get("userBirth") as string | null;
    const userAddress = formData.get("userAddress") as string | null;
    const userGoal = formData.get("userGoal") as string | null;
    const userPreference = formData.get("userPreference") as string | null; // 이미 문자열로 받아짐
    const profileImage = formData.get("profileImage") as File | null;

    if (!userEmail || !userPassword || !userName || !userNickname || !userGender) {
      return NextResponse.json({ error: "필수 필드가 누락되었습니다." }, { status: 400 });
    }

    // 프로필 이미지 업로드 처리
    let profileImageUrl = null;
    if (profileImage) {
      const fileName = `${Date.now()}_${profileImage.name}`;
      const storageRef = ref(storage, `crews/${fileName}`);

      const buffer = await profileImage.arrayBuffer();
      await uploadBytes(storageRef, new Uint8Array(buffer));

      profileImageUrl = await getDownloadURL(storageRef);
    }

    // 유효성 검증 후 데이터 구성
    const formattedBirth = userBirth ? userBirth.replace(/-/g, "") : null;
    const currentDate = new Date().toISOString();

    const body = {
      userEmail,
      userPassword,
      userName,
      userNickname,
      userGender: parseInt(userGender, 10),
      userBirth: formattedBirth,
      userAddress,
      userGoal,
      userPreference: userPreference || "", // 이미 쉼표로 구분된 문자열로 보냄
      userCreatedDt: currentDate,
      userUpdatedDt: currentDate,
      userOauthId: null,
      userProfile: profileImageUrl,
      userEmailIsAuthenticated: 1,
    };

    console.log("최종 전송 데이터:", body);

    // 백엔드 API 호출
    const response = await fetch(`${process.env.BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || "회원가입 실패" }, { status: 400 });
    }

    return NextResponse.json(
      { success: true, message: "회원가입이 성공했습니다." },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
