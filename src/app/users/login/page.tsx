"use client";

import React, { useState } from "react";

// Shadcn-UI 컴포넌트 불러오기
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * 타입 선언
 * LoginForm,
 * ErrorMessage
 */
type LoginForm = {
  email: string;
  password: string;
};
type ErrorMessage = {
  email: string;
  password: string;
};

/**
 * 로그인 페이지
 * · 사용자 로그인
 * · 로그인시, 유효성 검사 실행
 * · 회원가입 페이지로 이동
 * · 비밀번호 찾기 페이지로 이동
 */
export default function LoginPage() {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorMessage>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // 유효성 검사
    if (id === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: value.includes("@") ? "" : "유효한 이메일 주소를 입력하세요.",
      }));
    } else if (id === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          value.length >= 8 ? "" : "비밀번호는 최소 8자리 이상이어야 합니다.",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 간단한 프론트엔드 유효성 검사
    if (!formData.email || !formData.password) {
      console.log("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data || "로그인에 실패했습니다.");
      } else {
        console.log(data.message || "로그인이 성공했습니다.");
        // 로그인 성공 시 로직 추가 가능
      }
    } catch (error) {
      console.log("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Runtime</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <span className="text-red-500 text-sm min-h-[1.5em]">
                  {errors.email || " "}
                </span>
                <Label className="hidden" htmlFor="email">
                  이메일
                </Label>
                <Input
                  id="email"
                  placeholder="이메일"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <span className="text-red-500 text-sm min-h-[1.5em]">
                  {errors.password || " "}
                </span>
                <Label className="hidden" htmlFor="password">
                  비밀번호
                </Label>
                <Input
                  id="password"
                  placeholder="비밀번호"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                로그인
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}
