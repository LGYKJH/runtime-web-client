"use client";

import * as React from "react";
import { useState } from "react";
import { Calendar as BaseCalendar } from "@/components/ui/calendar"; // 기존 컴포넌트 import
import { Badge } from "@/components/ui/badge"; // 새로 추가된 컴포넌트
import { CrewPlan } from "@/app/types/crewPlan";

interface CrewCalendarProps {
  onSelectDate: (date: Date | null) => void;
  crewId: number;
  crewPlans: CrewPlan[]; // 일정 데이터 추가
}

function CrewCalendar({ onSelectDate, crewPlans }: CrewCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 날짜 클릭 핸들러
  const handleDayClick = (date: Date | undefined) => {
    const selected = date || null;
    console.log("Day Clicked:", selected); // 추가
    setSelectedDate(selected);
    onSelectDate(selected);
  };

  // 새로 추가
  const getDayPlans = (date: Date): string[] => {
    return crewPlans
      .filter((plan) => {
        const selectedDate = new Date(plan.crewPlanSelectedDate);
        return date.toDateString() === selectedDate.toDateString();
      })
      .map((plan) => plan.crewPlanContent);
  };

  return (
    <div className="w-full flex flex-col items-start justify-center">
      {/* 기존 Calendar 컴포넌트를 활용 */}
      <BaseCalendar
        mode="single"
        style={{ width: "100%" }}
        selected={selectedDate}
        onSelect={(date) => {
          console.log("BaseCalendar onSelect:", date); // 로그 추가
          handleDayClick(date); // 날짜 클릭 핸들러 호출
        }}
        showOutsideDays={true} // 바깥 날짜 표시
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
          month: "space-y-4 w-full",
          table: "w-full h-full border-collapse space-y-1",
          head: "",
          head_row: "",
          head_cell: "py-2.5",
          row: "w-full mt-2",
          cell: "relative p-1 align-top",
        }}
        components={{
          Day: ({ date, ...props }) => {
            const plans = getDayPlans(date);

            return (
              <div
                className="relative flex flex-col items-start justify-between p-2"
                onClick={() => handleDayClick(date)}
                style={{
                  aspectRatio: "1 / 1", // 셀을 정사각형으로 고정
                  minWidth: 0, // flexbox 환경에서 너비 계산 안정화
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-start items-start p-2 gap-y-2">
                  {/* 날짜는 왼쪽 정렬 */}
                  <span className="text-sm">{date.getDate()}</span>

                  {plans.length > 0 && (
                    <div className="flex flex-col justify-start items-start">
                      {plans.slice(0, 2).map((content, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {content}
                        </Badge>
                      ))}
                      {plans.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{plans.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          },
        }}
      />
    </div>
  );
}

export default CrewCalendar;
