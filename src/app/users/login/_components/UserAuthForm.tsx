"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import { ErrorMessage, LoginFormType } from "@/lib/types";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const UserAuthForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorMessage>({
    emailError: "",
    passwordError: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: value.includes("@") ? "" : "유효한 이메일 주소를 입력하세요.",
      }));
    } else if (id === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: value.length >= 8 ? "" : "비밀번호는 최소 8자리 이상이어야 합니다.",
      }));
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      console.log("이메일과 비밀번호를 모두 입력해주세요.");
      setIsLoading(false);
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
        toast.error(data.message || "로그인에 실패했습니다.");
      } else {
        toast.success(data.message);

        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    } catch (error) {
      console.log("서버와의 통신 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <form className="w-full flex flex-col justify-center items-center gap-y-4">
        <Label className="sr-only" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          value={formData.email}
          onChange={handleChange}
          className="min-w-[300px] max-w-[400px] w-full"
        />
        <Label className="sr-only" htmlFor="password">
          Password
        </Label>
        <Input
          id="password"
          placeholder="비밀번호"
          type="password"
          autoCapitalize="none"
          autoComplete="current-password"
          autoCorrect="off"
          disabled={isLoading}
          value={formData.password}
          onChange={handleChange}
          className="min-w-[300px] max-w-[400px] w-full"
        />
        <Button
          type="button"
          disabled={isLoading}
          className="min-w-[300px] max-w-[400px] w-full"
          onClick={handleSubmit}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          로그인
        </Button>

        <a href="/users/register" className="text-sm text-blue-500 hover:underline mt-2">
          회원가입
        </a>
      </form>

      {/* <div className="mt-4 flex flex-col justify-center items-start gap-y-0.5">
        <span className="text-red-500 text-xs">{errors.emailError || " "}</span>
        <span className="text-red-500 text-xs">
          {errors.passwordError || " "}
        </span>
      </div> */}
    </div>
  );
};

export default UserAuthForm;
