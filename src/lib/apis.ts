import { RegisterFormType } from "@/lib/types";

/**
 * 회원가입 API 요청
 * @param formData - 회원가입 폼 데이터
 * @returns Promise 응답 데이터
 */
export async function registerUser(formData: RegisterFormType): Promise<any> {
  try {
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "회원가입에 실패했습니다.");
    }

    return data;
  } catch (error) {
    console.error("API 호출 중 오류:", error);
    throw error;
  }
}
