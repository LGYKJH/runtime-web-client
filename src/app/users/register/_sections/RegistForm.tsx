"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputField from "../_components/InputField";
import Address from "@/components/ui/address";
import StepNavigation from "../_components/StepNavigation";
import { ErrorMessage, RegisterFormType } from "@/lib/types";

// 스포츠 항목 리스트
const sports = [
  "로드 런",
  "트레일 런",
  "하프 마라톤",
  "마라톤",
  "리커버리 런",
  "조깅",
];

const STEPS = [
  ["userEmail", "userPassword", "userName"],
  ["userNickname", "userGender", "userBirth"],
  ["userAddress", "userGoal", "userPreference"],
];

const LABELS: { [key: string]: string } = {
  userEmail: "이메일 주소",
  userPassword: "비밀번호",
  userName: "이름",
  userNickname: "닉네임",
  userGender: "성별",
  userBirth: "생년월일",
  userAddress: "주소",
  userGoal: "목표",
  userPreference: "선호 유형",
};

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormType>({
    userEmail: "",
    userPassword: "",
    userName: "",
    userNickname: "",
    userGender: 1,
    userBirth: "",
    userAddress: "",
    userGoal: "",
    userPreference: [],
  });

  const [errors, setErrors] = useState<ErrorMessage>({});
  const [step, setStep] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // 유효성 검사
    if (id === "userEmail") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userEmail: value.includes("@")
          ? ""
          : "유효한 이메일 주소를 입력하세요.",
      }));
    } else if (id === "userPassword") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userPassword:
          value.length >= 8 ? "" : "비밀번호는 최소 8자리 이상이어야 합니다.",
      }));
    } else if (id === "userBirth") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userBirth: value ? "" : "생년월일을 선택하세요.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: value ? "" : `${LABELS[id]}을(를) 입력하세요.`,
      }));
    }
  };

  // 주소 daum API
  const handleAddressChange = (addressData: {
    postcode: string;
    address: string;
    detailAddress: string;
  }) => {
    const fullAddress = `${addressData.address} ${addressData.detailAddress}`;
    setFormData((prevData) => ({
      ...prevData,
      userAddress: fullAddress,
    }));
  };

  // 라디오 박스
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      userGender: Number(value), // 라디오 버튼 값 저장 (0: 남성, 1: 여성)
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      userGender: "",
    }));
  };

  // Checkbox 변경 핸들러
  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedPreferences = checked
        ? [...prevData.userPreference, value]
        : prevData.userPreference.filter((pref) => pref !== value);

      return {
        ...prevData,
        userPreference: updatedPreferences,
      };
    });
  };

  const handleNext = () => {
    const currentStepFields = STEPS[step];
    const newErrors: ErrorMessage = {};

    // 현재 단계에서 누락된 필드 확인
    currentStepFields.forEach((key) => {
      if (key === "userGender" && formData.userGender === null) {
        newErrors[key] = `${LABELS[key]}을(를) 선택하세요.`;
      } else if (
        key === "userPreference" &&
        formData.userPreference.length === 0
      ) {
        newErrors[key] = `${LABELS[key]}을(를) 선택하세요.`;
      } else if (!formData[key as keyof RegisterFormType]) {
        newErrors[key] = `${LABELS[key]}을(를) 입력하세요.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = async () => {
    const newErrors: ErrorMessage = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof RegisterFormType]) {
        newErrors[key] = `${LABELS[key]}을(를) 입력하세요.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // `userPreference` 배열을 문자열로 변환
      const payload = {
        ...formData,
        userPreference: formData.userPreference.join(","),
      };

      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data || "회원가입에 실패했습니다.");
      } else {
        console.log(data.message || "회원가입이 성공했습니다.");
      }
    } catch (error) {
      console.log("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>
            단계 {step + 1} / {STEPS.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {STEPS[step].map((key) => {
                if (key === "userGender") {
                  return (
                    <div key={key} className="flex flex-col gap-2">
                      <label className="text-sm font-medium">
                        {LABELS[key]}
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="userGender"
                            value={1}
                            checked={formData.userGender === 1}
                            onChange={handleRadioChange}
                          />
                          남성
                        </label>
                        <label className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="userGender"
                            value={2}
                            checked={formData.userGender === 2}
                            onChange={handleRadioChange}
                          />
                          여성
                        </label>
                      </div>
                      {errors.userGender && (
                        <p className="text-red-500 text-sm">
                          {errors.userGender}
                        </p>
                      )}
                    </div>
                  );
                }

                if (key === "userBirth") {
                  return (
                    <div key={key} className="flex flex-col gap-2">
                      <label className="text-sm font-medium">
                        {LABELS[key]}
                      </label>
                      <input
                        type="date"
                        id={key}
                        value={formData[key] || ""}
                        onChange={handleChange}
                        className="border rounded-md p-2"
                      />
                      {errors[key] && (
                        <p className="text-red-500 text-sm">{errors[key]}</p>
                      )}
                    </div>
                  );
                }

                if (key === "userAddress") {
                  return (
                    <div key={key} className="flex flex-col gap-2">
                      <label className="text-sm font-medium">
                        {LABELS[key]}
                      </label>
                      <Address onAddressChange={handleAddressChange} />
                      {errors[key] && (
                        <p className="text-red-500 text-sm">{errors[key]}</p>
                      )}
                    </div>
                  );
                }

                if (key === "userPreference") {
                  return (
                    <div key={key} className="flex flex-col gap-2">
                      <label className="text-sm font-medium">
                        {LABELS[key]}
                      </label>
                      <div className="flex flex-col gap-1">
                        {sports.map((sport) => (
                          <label
                            key={sport}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              value={sport}
                              checked={formData.userPreference.includes(sport)}
                              onChange={handlePreferenceChange}
                            />
                            {sport}
                          </label>
                        ))}
                      </div>
                      {errors[key] && (
                        <p className="text-red-500 text-sm">{errors[key]}</p>
                      )}
                    </div>
                  );
                }

                return (
                  <InputField
                    key={key}
                    id={key}
                    label={LABELS[key]}
                    placeholder={key}
                    value={formData[key as keyof RegisterFormType] as string}
                    error={errors[key]}
                    onChange={handleChange}
                  />
                );
              })}
              <StepNavigation
                step={step}
                totalSteps={STEPS.length}
                onPrev={handlePrev}
                onNext={handleNext}
                onSubmit={handleSubmit}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}
