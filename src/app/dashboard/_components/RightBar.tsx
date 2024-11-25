"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useRef } from "react";
import { useFilterStore } from "@/app/_stores/filterStore";
import NaverMap from "./NaverMap";

type Districts =
  | "강남구"
  | "강서구"
  | "강북구"
  | "강동구"
  | "관악구"
  | "노원구"
  | "마포구"
  | "서초구"
  | "송파구"
  | "영등포구"
  | "은평구"
  | "종로구";

const RightBar = () => {
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

  const districts: Districts[] = [
    "강남구",
    "강서구",
    "강북구",
    "강동구",
    "관악구",
    "노원구",
    "마포구",
    "서초구",
    "송파구",
    "영등포구",
    "은평구",
    "종로구",
  ];

  const {
    selectedDays,
    selectedSports,
    selectedCrewSize,
    selectedDistrict,
    toggleDay,
    toggleSport,
    setCrewSize,
    setDistrict,
  } = useFilterStore();

  const districtHandlerRef = useRef<((district: Districts) => void) | null>(
    null
  );

  const handleDistrictClick = (district: Districts) => {
    // 장소 선택 토글
    setDistrict(selectedDistrict === district ? null : district);
    if (districtHandlerRef.current) {
      districtHandlerRef.current(district);
    }
  };

  const handleCrewSizeClick = (size: string) => {
    // 인원수 선택 토글
    setCrewSize(selectedCrewSize === size ? null : size);
  };

  return (
    <section className="min-w-[320px] max-w-[320px] flex flex-col justify-start items-center gap-y-4 px-4 py-4 border-l-[0.5px] border-l-sidebar-border">
      <div className="w-full px-1 pt-1.5 pb-2 gap-y-1 flex flex-col justify-start items-start">
        <h4 className="pb-2">필터</h4>

        {/* 요일 선택 */}
        <Label className="font-normal py-1.5 text-secondary">요일</Label>
        <div className="pt-0 pb-4 flex flex-row justify-start items-center gap-x-2">
          {days.map((day) => (
            <Button
              key={day}
              variant="ghost"
              size="icon"
              className={`p-1 w-7 h-7 font-normal rounded-full ${
                selectedDays.includes(day)
                  ? "bg-pointColor text-white"
                  : "hover:bg-pointColor hover:text-white"
              }`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </Button>
          ))}
        </div>

        {/* 유형 선택 */}
        <Label className="font-normal py-1.5 text-secondary">유형</Label>
        <div className="pt-0 pb-4 flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2">
          {sports.map((sport) => (
            <Button
              key={sport}
              variant="ghost"
              size="sm"
              className={`px-2.5 h-7 font-normal leading-normal rounded-full ${
                selectedSports.includes(sport)
                  ? "bg-pointColor text-white"
                  : "hover:bg-pointColor hover:text-white"
              }`}
              onClick={() => toggleSport(sport)}
            >
              {sport}
            </Button>
          ))}
        </div>

        {/* 인원수 선택 */}
        <Label className="font-normal py-1.5 text-secondary">인원수</Label>
        <div className="pt-0 pb-4 flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2">
          {crewSizes.map((size) => (
            <Button
              key={size}
              variant="ghost"
              size="sm"
              className={`px-2.5 h-7 font-normal leading-normal rounded-full ${
                selectedCrewSize === size
                  ? "bg-pointColor text-white"
                  : "hover:bg-pointColor hover:text-white"
              }`}
              onClick={() => handleCrewSizeClick(size)}
            >
              {size}
            </Button>
          ))}
        </div>

        {/* 장소 선택 */}
        <Label className="font-normal py-1.5 text-secondary">장소</Label>
        <NaverMap
          id="filterMap"
          onDistrictClick={(handler: (district: Districts) => void) =>
            (districtHandlerRef.current = handler)
          }
        />
        <div className="pt-2 flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2">
          {districts.map((district) => (
            <Button
              key={district}
              variant="ghost"
              size="sm"
              className={`px-2.5 h-7 font-normal leading-normal rounded-full ${
                selectedDistrict === district
                  ? "bg-pointColor text-white"
                  : "hover:bg-pointColor hover:text-white"
              }`}
              onClick={() => handleDistrictClick(district)}
            >
              {district}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightBar;
