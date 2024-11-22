"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 유틸리티 함수 및 상수
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};


type CalendarProps = {
  onSelectDate?: (date: Date) => void;
  highlightDates?: { [key: string]: string[] }; // 날짜별 계획 배열 (e.g., "2023-11-21": ["Plan A", "Plan B"])
};

const Calendar = ({ onSelectDate, highlightDates }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(selectedDate);
    if (onSelectDate) {
      onSelectDate(selectedDate);
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalSlots = firstDayOfMonth + daysInMonth; // 전체 슬롯(공백 + 날짜)
    const rows = Math.ceil(totalSlots / 7); // 필요한 줄 수

    // 이전 달 공백 추가
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="mx-2 h-6 w-6"></div>);
    }

    // 현재 달 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const plans = highlightDates?.[dateKey] || [];

      
      const isSelected =
        selectedDate?.getDate() === day &&
        selectedDate?.getMonth() === currentDate.getMonth() &&
        selectedDate?.getFullYear() === currentDate.getFullYear();
      days.push(
        <div key={day} className="flex flex-col items-center">
          <button
            onClick={() => handleDateClick(day)}
            className={`mx-2 h-6 w-6 text-xs font-medium text-[#101010] rounded-full flex items-center justify-center
                        ${isSelected ? "bg-[#006ffd] text-white" : "hover:bg-gray-100"}`}
          >
            {day}
          </button>
          {plans.length > 0 && (
            <div className="text-[10px] text-gray-500 mt-1">{plans[0]}</div>
          )}
        </div>
      );
    }

    // 7개씩 나누어 그룹화
    const weeks = [];
    for (let i = 0; i < rows; i++) {
      weeks.push(
        <div key={`week-${i}`} className="flex justify-between w-full">
          {days.slice(i * 7, i * 7 + 7)}
        </div>
      );
    }

    return weeks;
  };

  return (
    <section className="w-full px-6 flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-start itesm-center bg-[#f9f9f9] rounded-md gap-y-6 px-4 py-2">
        {/* 달력 헤더 */}
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="font-semibold text-sm text-[#101010]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex flex-row justify-start items-center gap-x-4">
            <button
              onClick={handlePrevMonth}
              className="rounded-full hover:bg-gray-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="rounded-full hover:bg-gray-200"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-y-2">
          {/* 달력 요일 */}
          <div className="w-full flex flex-row justify-between items-center">
            {dayNames.map((day, index) => (
              <div
                key={index}
                className="w-10 h-4 text-center font-medium text-[#101010] text-xs"
              >
                {day}
              </div>
            ))}
          </div>
          {/* 달력 일 */}
          {renderCalendarDays()}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
