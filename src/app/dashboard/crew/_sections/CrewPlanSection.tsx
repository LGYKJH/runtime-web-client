"use client";

import React, { useEffect, useState } from "react";
import CrewCalendar from "../../_components/CrewCalendar";
import { CrewPlan } from "@/app/types/crewPlan";
import { CrewCalendarEventForm } from "@/app/dashboard/_components/CrewCalendarEventForm";
import { toast } from "sonner";

interface CrewPlanSectionProps {
  crewId: number;
}

const CrewPlanSection = ({ crewId }: CrewPlanSectionProps) => {
  const [crewPlans, setCrewPlans] = useState<CrewPlan[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPlans, setSelectedPlans] = useState<CrewPlan[]>([]);

  useEffect(() => {
    const fetchCrewCalendar = async () => {
      try {
        const response = await fetch(`/api/crew/plan/detail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ crewId }),
        });

        const data: CrewPlan[] = await response.json();
        setCrewPlans(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCrewCalendar();
  }, [crewId]);

  const handleDateSelect = (date: Date | null) => {
    console.log("Selected Date:", date); // 추가
    setSelectedDate(date);

    if (date) {
      // 선택한 날짜에 해당하는 일정 필터링 (단일 날짜만 고려)
      const filteredPlans = crewPlans.filter((plan) => {
        const eventDate = new Date(plan.crewPlanStartDt); // 일정의 날짜
        return eventDate.toDateString() === date.toDateString(); // 선택한 날짜와 비교
      });

      setSelectedPlans(filteredPlans);
    } else {
      setSelectedPlans([]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-y-5 px-10">
      {/* 캘린더 컴포넌트 */}
      <CrewCalendar
        crewId={crewId}
        onSelectDate={handleDateSelect}
        crewPlans={crewPlans}
      />

      <div className="mt-4">
        {selectedDate && (
          <div>
            <h2 className="text-lg font-semibold">
              {selectedDate.toDateString()} 일정
            </h2>
            {selectedPlans.length > 0 ? (
              <ul>
                {selectedPlans.map((plan) => (
                  <li key={plan.crewPlanId} className="text-sm border-b py-2">
                    <p className="font-medium">{plan.crewPlanContent}</p>
                    <p className="text-sm text-gray-600">
                      장소: {plan.crewPlanPlace || "위치 없음"}
                    </p>
                    <p className="text-sm text-gray-600">
                      시간: {plan.crewPlanStartDt} ~{" "}
                      {plan.crewPlanEndDt || "없음"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">
                선택한 날짜에 일정이 없습니다.
              </p>
            )}

            <div className="mt-4">
              <CrewCalendarEventForm
                crewId={crewId}
                selectedDate={selectedDate}
                onSubmit={() => {
                  setSelectedDate(null);
                  toast.success("일정이 추가되었습니다!");
                }}
                onCancel={() => setSelectedDate(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewPlanSection;
