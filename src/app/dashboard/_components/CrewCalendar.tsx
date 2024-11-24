"use client";

import * as React from "react";
import { useState } from "react";
import { Calendar as BaseCalendar } from "@/components/ui/calendar"; // 기존 컴포넌트 import
import { CrewCalendarEventForm } from "@/app/dashboard/_components/CrewCalendarEventForm";

interface CrewCalendarProps {
  onSelectDate: (date: Date | null) => void;
  crewId: number; // 추가된 crewId props
}

function CrewCalendar({ onSelectDate, crewId }: CrewCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 날짜 클릭 핸들러
  const handleDayClick = (date: Date | undefined) => {
    setSelectedDate(date || null); // 내부 상태 업데이트
    onSelectDate(date || null); // 부모로 전달
  };

  return (
    <div className="w-full flex flex-col justify-center px-5">
      {/* 기존 Calendar 컴포넌트를 활용 */}
      <BaseCalendar
        mode="single"
        style={{ width: "100%" }}
        selected={selectedDate}
        onSelect={handleDayClick} // 날짜 선택 핸들러 전달
        showOutsideDays={true} // 바깥 날짜 표시
      />
      {/* 날짜가 선택되었을 때 이벤트 폼 표시 */}
      {selectedDate && (
        <CrewCalendarEventForm
          selectedDate={selectedDate}
          crewId={crewId}
          onSubmit={(formData) => {
            console.log("Event added:", formData);
            setSelectedDate(null); // 제출 후 폼 숨기기
          }}
          onCancel={() => setSelectedDate(null)} // 취소 버튼으로 폼 숨기기
        />
      )}
    </div>
  );
}

export default CrewCalendar;
