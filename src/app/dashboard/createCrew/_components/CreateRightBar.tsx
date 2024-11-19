"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useRef } from "react";

const CreateRightBar = () => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const sports = [
    "로드 런",
    "트레일 런",
    "하프 마라톤",
    "마라톤",
    "리커버리 런",
    "조깅",
  ];
  const crewSizes = [
    "1 ~ 4명",
    "5 ~ 8명",
    "9 ~ 12명",
    "13 ~ 16명",
    "17 ~ 20명",
    "20명 이상",
  ];

  return (
    <section className="relative min-w-[320px] max-w-[320px] flex flex-col justify-start items-center gap-y-4 px-4 py-4 border-l-[0.5px] border-l-sidebar-border">
      <div className="w-full px-1 pt-1.5 pb-2 gap-y-1 flex flex-col justify-start items-start">
        <h4 className="pb-2">필터</h4>
        <Label className="font-normal py-1.5 text-secondary">요일</Label>
        <div className="pt-0 pb-4 flex flex-row justify-start items-center gap-x-2">
          {days.map((day) => (
            <Button
              key={day}
              variant="ghost"
              size="icon"
              className="p-1 w-7 h-7 font-normal hover:bg-[#193fff] focus:bg-[#193fff] hover:text-white focus:text-white rounded-full"
            >
              {day}
            </Button>
          ))}
        </div>
        <Label className="font-normal py-1.5 text-secondary">유형</Label>
        <div className="pt-0 pb-4 flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2">
          {sports.map((sport) => (
            <Button
              key={sport}
              variant="ghost"
              size="sm"
              className="px-2.5 h-7 font-normal hover:bg-[#193fff] focus:bg-[#193fff] hover:text-white focus:text-white leading-normal rounded-full"
            >
              {sport}
            </Button>
          ))}
        </div>
        <Label className="font-normal py-1.5 text-secondary">인원수</Label>
        <div className="pt-0 pb-4 flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2">
          {crewSizes.map((size) => (
            <Button
              key={size}
              variant="ghost"
              size="sm"
              className="px-2.5 h-7 font-normal hover:bg-[#193fff] focus:bg-[#193fff] hover:text-white focus:text-white leading-normal rounded-full"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-[56px] w-full flex flex-row justify-center items-center">
        <Button className="w-[88%]">제출하기</Button>
      </div>
    </section>
  );
};

export default CreateRightBar;
