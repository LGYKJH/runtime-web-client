import { NextResponse, NextRequest } from "next/server";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../firebaseConfig";

export async function POST(request: NextRequest) {
  try {
    // 요청에서 파일 정보 가져오기
    const { file, fileName } = await request.json();

    if (!file || !fileName) {
      return NextResponse.json(
        { error: "file과 fileName이 필요합니다." },
        { status: 400 }
      );
    }

    // Base64 데이터를 Blob으로 변환
    const buffer = Buffer.from(file, "base64");

    // Firebase Storage 참조 생성
    const storageRef = ref(storage, `crews/${fileName}`);

    // 파일 업로드
    await uploadBytes(storageRef, buffer);

    // 업로드된 파일의 URL 가져오기
    const downloadURL = await getDownloadURL(storageRef);

    return NextResponse.json({ url: downloadURL });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
