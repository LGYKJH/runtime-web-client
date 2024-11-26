"use client";

import * as React from "react";
import { useState } from "react";
import { Calendar as BaseCalendar } from "@/components/ui/calendar"; // 기존 컴포넌트 import
import { Badge } from "@/components/ui/badge"; // 새로 추가된 컴포넌트
import { CrewPlan } from "@/app/types/crewPlan";
import { ko } from "date-fns/locale";

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
    setSelectedDate(selected);
    onSelectDate(selected);
  };

  const getDayPlans = (date: Date): string[] => {
    // 입력된 날짜를 ISO 형식으로 변환 후 'YYYY-MM-DD' 형식만 추출
    const selectedDate = date.toISOString().split("T")[0];

    // DB에서 가져온 날짜와 비교
    return crewPlans
      .filter((plan) => {
        const databaseDate = plan.crewPlanSelectedDate.split("T")[0];
        return databaseDate === selectedDate; // 비교 시 ISO 형식 통일
      })
      .map((plan) => plan.crewPlanContent);
  };

  return (
    <div className="w-full flex flex-col items-start justify-center">
      <BaseCalendar
        mode="single"
        locale={ko}
        defaultMonth={new Date()}
        selected={selectedDate}
        onSelect={(date) =>
          handleDayClick(
            date ? new Date(date) : null // 날짜를 다시 Date 객체로 변환
          )
        }
        showOutsideDays={true}
        numberOfMonths={1}
        weekStartsOn={0}
        style={{ width: "100%" }}
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
                  aspectRatio: "1 / 1",
                  minWidth: 0,
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-start items-start p-2 gap-y-2">
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
