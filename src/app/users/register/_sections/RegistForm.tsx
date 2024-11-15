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
import StepNavigation from "../_components/StepNavigation";
import { ErrorMessage, RegisterFormType } from "@/lib/types";

const STEPS = [
  ["userEmail", "userPassword", "userName"],
  ["userNickname", "userGender", "userBirth"],
  ["userAddress", "userGoal", "userPreference"],
];

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormType>({
    userEmail: "",
    userPassword: "",
    userName: "",
    userNickname: "",
    userGender: 0,
    userBirth: "",
    userAddress: "",
    userGoal: "",
    userPreference: "",
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
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: value ? "" : `${id}을(를) 입력하세요.`,
      }));
    }
  };

  const handleNext = () => {
    const currentStepFields = STEPS[step];
    const newErrors: ErrorMessage = {};

    // 현재 단계에서 누락된 필드 확인
    currentStepFields.forEach((key) => {
      if (!formData[key as keyof RegisterFormType]) {
        newErrors[key] = `${key}을(를) 입력하세요.`;
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
        newErrors[key] = `${key}을(를) 입력하세요.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
              {STEPS[step].map((key) => (
                <InputField
                  key={key}
                  id={key}
                  placeholder={key}
                  value={formData[key as keyof RegisterFormType] as string}
                  error={errors[key]}
                  onChange={handleChange}
                />
              ))}
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
