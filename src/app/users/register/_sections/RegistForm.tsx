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
import Address from "@/components/ui/address";

import InputField from "../_components/InputField";
import StepNavigation from "../_components/StepNavigation";

import { ErrorMessage, RegisterFormType } from "@/lib/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ProfileImageUploader from "../_components/ProfileImageUploader";

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
  ["profileImage"], // 프로필 이미지 전용 단계
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
  profileImage: "프로필 이미지",
};

export default function RegisterForm() {
  const router = useRouter();
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
    profileImage: null, // 프로필 이미지 상태 추가
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
        userEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "유효한 이메일 주소를 입력하세요.",
      }));
    } else if (id === "userPassword") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userPassword:
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
            ? ""
            : "비밀번호는 8자리 이상, 숫자, 영문, 특수문자를 포함해야 합니다.",
      }));
    } else if (id === "userName") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userName: /^[가-힣]+$/.test(value)
          ? ""
          : "이름은 한글만 입력 가능합니다.",
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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      userGender: Number(value), // 라디오 버튼 값 업데이트
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      userGender: "", // 에러 초기화
    }));
  };

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
    setErrors((prevErrors) => ({
      ...prevErrors,
      userAddress: "",
    }));
  };

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
    setErrors((prevErrors) => ({
      ...prevErrors,
      userPreference: "",
    }));
  };

  const handleImageChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImage: file,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      profileImage: file ? "" : "프로필 이미지를 업로드해주세요.",
    }));
  };

  const handleNext = () => {
    const currentStepFields = STEPS[step];
    const newErrors: ErrorMessage = {};

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

    setStep((prevStep) => Math.min(prevStep + 1, STEPS.length - 1));
  };

  const handlePrev = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Create FormData instance
      const formPayload = new FormData();
      formPayload.append("userEmail", formData.userEmail);
      formPayload.append("userPassword", formData.userPassword);
      formPayload.append("userName", formData.userName);
      formPayload.append("userNickname", formData.userNickname);
      formPayload.append("userGender", formData.userGender.toString());
      formPayload.append("userBirth", formData.userBirth);
      formPayload.append("userAddress", formData.userAddress);
      formPayload.append("userGoal", formData.userGoal);
      formPayload.append("userPreference", formData.userPreference.join(","));

      // Append file only if profileImage exists
      if (formData.profileImage) {
        formPayload.append("profileImage", formData.profileImage);
      }

      const response = await fetch("/api/user/register", {
        method: "POST",
        body: formPayload, // No need for headers with FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `${errorData.error} 하이` || "알 수 없는 오류가 발생했습니다."
        );
        return;
      }

      const data = await response.json();
      toast.success(data.message);
      router.push("/users/login");
    } catch (error) {
      toast.error("서버와의 통신 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
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
                if (key === "userPassword") {
                  return (
                    <div key={key} className="flex flex-col gap-2">
                      <label className="text-sm font-medium">
                        {LABELS[key]}
                      </label>
                      <input
                        type="password" // password 타입으로 수정
                        id={key}
                        value={formData[key] || ""}
                        onChange={handleChange}
                        className="border rounded-md p-2 focus:border-none focus:outline-none focus:ring-0"
                        placeholder="비밀번호"
                      />
                      {errors[key] && (
                        <p className="text-red-500 text-sm">{errors[key]}</p>
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

                if (key === "profileImage") {
                  return (
                    <div
                      key={key}
                      className="w-full flex flex-col justify-items-start gap-y-2"
                    >
                      <label className="text-sm font-medium">
                        {LABELS[key]}
                      </label>
                      <ProfileImageUploader
                        file={formData.profileImage}
                        setFile={handleImageChange}
                      />
                      {errors[key] && (
                        <p className="text-red-500 text-sm">{errors[key]}</p>
                      )}
                    </div>
                  );
                }

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
                    label={LABELS[key]} // LABELS에서 label 가져오기
                    placeholder={LABELS[key]} // placeholder도 LABELS에서 가져오기
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
                isSubmitting={isSubmitting}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </section>
  );
}
