"use client";

import * as React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CrewCalendarEventForm } from "@/app/dashboard/_components/CrewCalendarEventForm";

// Nav 커스터마이징 컴포넌트
const CustomNav = ({
  onPreviousClick,
  onNextClick,
}: {
  onPreviousClick: () => void;
  onNextClick: () => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onPreviousClick}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        )}
        aria-label="Previous Month"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={onNextClick}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        )}
        aria-label="Next Month"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

// CalendarProps 타입 정의
export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  onSelectDate?: (date: Date | null) => void;
  highlightDates?: { [key: string]: string[] };
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  onSelectDate,
  highlightDates,
  ...props
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined); // 단일 날짜 선택 상태

  // 날짜 선택 처리 함수
  const handleDateSelect = (selected: Date | undefined): void => {
    setSelectedDate(selected);

    if (onSelectDate) {
      onSelectDate(selected || null); // undefined를 null로 변환하여 콜백 호출
    }
  };

  return (
    <div>
      <DayPicker
        mode="single" // 단일 날짜 선택 모드
        selected={selectedDate as Date | undefined}
        onSelect={handleDateSelect as (selected: unknown) => void}
        showOutsideDays={showOutsideDays}
        className={cn("p-3 w-full", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4 w-full",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-full text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-full p-0 font-normal aria-selected:opacity-100"
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          Nav: CustomNav, // 커스텀 네비게이션 컴포넌트
        }}
        {...props}
      />

      {selectedDate && (
        <CrewCalendarEventForm
          selectedDate={selectedDate}
          onSubmit={(formData: unknown) =>
            console.log("Form Data Submitted: ", formData)
          }
          onCancel={() => setSelectedDate(undefined)}
        />
      )}
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
