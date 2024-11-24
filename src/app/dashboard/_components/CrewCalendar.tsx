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
            "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
          month: "space-y-4 w-full flex flex-col",
          table: "w-full h-full border-collapse space-y-1",
          head_row: "",
          row: "w-full mt-2",
          cell: "h-14",
        }}
        components={{
          Day: ({ date, ...props }) => {
            const plans = getDayPlans(date);

            return (
              <div className="relative" onClick={() => handleDayClick(date)}>
                <span>{date.getDate()}</span>
                {plans.length > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center">
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
            );
          },
        }}
      />
      {/* 날짜에 따른 일정 배지 표시 */}
      <div className="mt-4">
        {selectedDate && (
          <div>
            <h2 className="text-lg font-semibold">
              {selectedDate.toDateString()} 일정
            </h2>
            {getDayPlans(selectedDate).map((plan, idx) => (
              <Badge key={idx} variant="outline" className="mr-2 text-xs">
                {plan}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CrewCalendar;
