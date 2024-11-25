"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface CreateRightBarProps {
  days: string[];
  setDays: React.Dispatch<React.SetStateAction<string[]>>;
  types: string[];
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  crewSize: number | undefined;
  setCrewSize: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleCreateCrew: () => void;
}

const CreateRightBar: React.FC<CreateRightBarProps> = ({
  days,
  setDays,
  types,
  setTypes,
  crewSize,
  setCrewSize,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  handleCreateCrew, // 함수 prop 추가
}) => {
  const dayOptions = ["월", "화", "수", "목", "금", "토", "일"];
  const sportOptions = [
    "로드 런",
    "트레일 런",
    "하프 마라톤",
    "마라톤",
    "리커버리 런",
    "조깅",
  ];
  const crewSizeOptions = [
    "1 ~ 4명",
    "5 ~ 8명",
    "9 ~ 12명",
    "13 ~ 16명",
    "17 ~ 20명",
    "20명 이상",
  ];

  const toggleMultiSelection = (
    value: string,
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value)); // 이미 선택된 값 제거
    } else {
      setSelectedItems([...selectedItems, value]); // 새로운 값 추가
    }
  };

  const handleCrewSizeSelection = (sizeOption: string) => {
    const match = sizeOption.match(/\d+/g); // 숫자 추출 (예: ["1", "4"])
    if (match) {
      const maxSize = parseInt(match[match.length - 1]); // 마지막 숫자를 최대값으로 설정
      setCrewSize(sizeOption === "20명 이상" ? 50 : maxSize);
    }
  };

  return (
    <section className="relative min-w-[320px] max-w-[320px] flex flex-col justify-start items-center gap-y-4 px-4 py-4 border-l-[0.5px] border-l-sidebar-border">
      <div className="w-full px-1 pt-1.5 pb-2 gap-y-1 flex flex-col justify-start items-start">
        <h4 className="pb-2">필터</h4>

        {/* 요일 선택 */}
        <Label className="font-normal py-1.5 text-secondary">요일</Label>
        <div className="w-full flex flex-col justify-items-start gap-y-1.5 pb-4">
          <div className="pt-0 flex flex-row justify-start items-center gap-x-2">
            {dayOptions.map((day) => (
              <Button
                key={day}
                variant="ghost"
                size="icon"
                className={`p-1 w-7 h-7 font-normal rounded-full ${
                  days.includes(day)
                    ? "bg-pointColor text-white"
                    : "hover:bg-pointColor hover:text-white"
                }`}
                onClick={() => toggleMultiSelection(day, days, setDays)}
              >
                {day}
              </Button>
            ))}
          </div>
          <div className="w-full flex flex-row justify-between items-center gap-x-4">
            <div className="w-full flex-1 flex flex-col justify-items-start">
              <Label className="font-normal py-1.5 text-secondary">
                시작 시간
              </Label>
              <Select
                defaultValue={startTime!}
                onValueChange={(e: string) => {
                  setStartTime(e);
                }}
              >
                <SelectTrigger className="flex-1 font-normal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[15rem]">
                    {Array.from({ length: 96 }).map((_, i) => {
                      const hour = Math.floor(i / 4)
                        .toString()
                        .padStart(2, "0");
                      const minute = ((i % 4) * 15).toString().padStart(2, "0");
                      return (
                        <SelectItem key={i} value={`${hour}:${minute}`}>
                          {hour}:{minute}
                        </SelectItem>
                      );
                    })}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex-1 flex flex-col justify-items-start">
              <Label className="font-normal py-1.5 text-secondary">
                종료 시간
              </Label>
              <Select
                defaultValue={startTime!}
                onValueChange={(e: string) => {
                  setStartTime(e);
                }}
              >
                <SelectTrigger className="font-normal flex flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[15rem]">
                    {Array.from({ length: 96 }).map((_, i) => {
                      const hour = Math.floor(i / 4)
                        .toString()
                        .padStart(2, "0");
                      const minute = ((i % 4) * 15).toString().padStart(2, "0");
                      return (
                        <SelectItem key={i} value={`${hour}:${minute}`}>
                          {hour}:{minute}
                        </SelectItem>
                      );
                    })}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 유형 선택 */}
        <Label className="font-normal py-1.5 text-secondary">유형</Label>
        <div className="pt-0 pb-4 flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2">
          {sportOptions.map((sport) => (
            <Button
              key={sport}
              variant="ghost"
              size="sm"
              className={`px-2.5 h-7 font-normal leading-normal rounded-full ${
                types.includes(sport)
                  ? "bg-pointColor text-white"
                  : "hover:bg-pointColor hover:text-white"
              }`}
              onClick={() => toggleMultiSelection(sport, types, setTypes)}
            >
              {sport}
            </Button>
          ))}
        </div>

        {/* 인원 선택 */}
        <Label className="font-normal py-1.5 text-secondary">인원수</Label>
        <div className="pt-0 pb-4 flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2">
          {crewSizeOptions.map((size) => (
            <Button
              key={size}
              variant="ghost"
              size="sm"
              className={`px-2.5 h-7 font-normal leading-normal rounded-full ${
                crewSize ===
                (size === "20명 이상"
                  ? 50
                  : parseInt(size.match(/\d+/g)?.[1] || "0"))
                  ? "bg-pointColor text-white"
                  : "hover:bg-pointColor hover:text-white"
              }`}
              onClick={() => handleCrewSizeSelection(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className="absolute bottom-[56px] w-full flex flex-row justify-center items-center">
        <Button className="w-[88%]" onClick={handleCreateCrew}>
          제출하기
        </Button>
      </div>
    </section>
  );
};

export default CreateRightBar;
