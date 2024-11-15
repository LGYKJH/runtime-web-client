import { ErrorMessage, RegisterFormType } from "@/lib/types";

/**
 * 특정 필드의 유효성을 검사합니다.
 * @param field - 검사할 필드 이름
 * @param value - 필드 값
 * @returns 유효하지 않을 경우 에러 메시지, 유효할 경우 빈 문자열
 */
export function validateField(
  field: keyof RegisterFormType,
  value: string
): string {
  switch (field) {
    case "userEmail":
      return value.includes("@") ? "" : "유효한 이메일 주소를 입력하세요.";
    case "userPassword":
      return value.length >= 8
        ? ""
        : "비밀번호는 최소 8자리 이상이어야 합니다.";
    default:
      return value ? "" : `${field}을(를) 입력하세요.`;
  }
}

/**
 * 여러 필드를 검사합니다.
 * @param fields - 검사할 필드들의 이름 배열
 * @param formData - 검사할 폼 데이터
 * @returns 에러 메시지 객체
 */
export function validateFields(
  fields: (keyof RegisterFormType)[],
  formData: RegisterFormType
): ErrorMessage {
  const errors: ErrorMessage = {};
  fields.forEach((field) => {
    const error = validateField(field, formData[field] as string);
    if (error) {
      errors[field] = error;
    }
  });
  return errors;
}
