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
    <div className="w-full flex flex-col justify-center px-5">
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
          head_row: "",
          row: "w-full mt-2",
          cell: "relative h-auto p-2 align-top",
        }}
        components={{
          Day: ({ date, ...props }) => {
            const plans = getDayPlans(date);

            return (
              <div
                className="flex flex-col items-start h-full w-full"
                onClick={() => handleDayClick(date)}
              >
                {/* 날짜는 왼쪽 정렬 */}
                <span className="text-sm">{date.getDate()}</span>

                {/* 일정 목록은 오른쪽 정렬 */}
                {plans.length > 0 && (
                  <div className="flex flex-col items-start mt-1 space-y-1">
                    {plans.map((content, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs truncate"
                      >
                        {content}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            );
          },
        }}
      />
    </div>
  );
}

export default CrewCalendar;
