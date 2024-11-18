"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";
import NaverMap from "./NaverMap";

const RightBar = () => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const sports = [
    "러닝",
    "마라톤",
    "하프 마라톤",
    "경보",
    "트레일 러닝",
    "펫 러닝",
    "피크닉",
    "글램핑",
    "캠핑",
  ];
  const crewSizes = ["1~4명", "5~8명", "9~12명", "13~20명", "20명 이상"];
  const districts = [
    "종로구",
    "중구",
    "강남구",
    "서초구",
    "송파구",
    "마포구",
    "영등포구",
    "강서구",
    "관악구",
    "노원구",
    "성북구",
    "은평구",
  ];

  return (
    <section className="min-w-[320px] max-w-[320px] flex flex-col justify-start items-center gap-y-4 px-4 py-4">
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

        <Label className="font-normal py-1.5 text-secondary">장소</Label>
        <NaverMap />
        <div className="pt-2 pb-2 flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2">
          {districts.map((district) => (
            <Button
              key={district}
              variant="ghost"
              size="sm"
              className="px-2.5 h-7 font-normal  hover:bg-[#193fff] focus:bg-[#193fff] hover:text-white focus:text-white leading-normal rounded-full"
            >
              {district}
            </Button>
          ))}
        </div>
      </div>
      <div></div>
      <div></div>
    </section>
  );
};

export default RightBar;
