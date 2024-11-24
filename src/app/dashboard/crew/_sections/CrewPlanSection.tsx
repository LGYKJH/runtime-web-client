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
        const response = await fetch(`/api/crew/detail/${crewId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: CrewPlan[] = await response.json();

        console.log(data);
        setCrewPlans(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCrewCalendar();
  }, [crewId]);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    if (!date) {
      // 날짜가 선택되지 않았을 경우 초기화
      setSelectedPlans([]);
      return;
    }

    // 날짜에 해당하는 계획 필터링
    const filteredPlans = crewPlans.filter((plan) => {
      const start = new Date(plan.crewPlanStartDt);
      const end = plan.crewPlanEndDt ? new Date(plan.crewPlanEndDt) : null;
      return end
        ? date >= start && date <= end
        : start.toDateString() === date.toDateString();
    });

    setSelectedPlans(filteredPlans);
  };

  return (
    <div className="w-full flex flex-col items-center gap-y-5 px-10">
      <CrewCalendar crewId={crewId} onSelectDate={handleDateSelect} />
      {selectedDate && selectedPlans.length === 0 && (
        <CrewCalendarEventForm
          crewId={crewId}
          selectedDate={selectedDate}
          onSubmit={() => setSelectedDate(null)}
          onCancel={() => setSelectedDate(null)} // 취소 버튼으로 폼 숨기기
        />
      )}
      {selectedPlans.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">선택한 날짜의 일정</h2>
          <ul>
            {selectedPlans.map((plan) => (
              <li
                key={plan.crewPlanId}
                className="text-sm flex justify-between items-center"
              >
                <span>
                  {plan.crewPlanContent} @ {plan.crewPlanPlace || "위치 없음"}
                </span>
                <div>
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => console.log(`수정: ${plan.crewPlanId}`)}
                  >
                    수정
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => console.log(`삭제: ${plan.crewPlanId}`)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CrewPlanSection;
