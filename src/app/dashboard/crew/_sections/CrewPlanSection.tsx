"use client";

import React, {  useEffect, useState } from "react";
import Calendar from "@/app/dashdash/_components/Calendar";
import { CrewPlans } from "@/app/types/crewPlans";
import { toast } from "sonner";

interface CrewPlanSectionProps {
  crewId: number;
}

const CrewPlanSection = ({ crewId }: CrewPlanSectionProps) => {
  const [crewPlans, setCrewPlans] = useState<CrewPlans[]>([]);
  const [selectedDatePlans, setSelectedDatePlans] = useState<CrewPlans[]>([]);

  useEffect(() => {
    const fetchCrewCalendar = async () => {
      try {
        const response = await fetch("/api/crew/detail");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data: CrewPlans[] = await response.json();
        setCrewPlans(data);
      } catch (error) {
        toast.error(error.message);
      }

    };

    fetchCrewCalendar();

  }, []);

  const handleDateSelect = (date: Date) => {
    // 날짜에 해당하는 계획 필터링
    const selectedPlans = crewPlans.filter((plan) => {
      const planStart = new Date(plan.crewPlanStartDt);
      const planEnd = plan.crewPlanEndDt ? new Date(plan.crewPlanEndDt) : null;

      // 날짜가 시작일과 종료일 사이에 있는지 확인
      if (planEnd) {
        return date >= planStart && date <= planEnd;
      }
      return date.toDateString() === planStart.toDateString();
    });

    setSelectedDatePlans(selectedPlans);
  };

  return (
    <div className="w-full">
      <Calendar onSelectDate={handleDateSelect} />
      <div className="mt-4">
        <h2 className="text-lg font-semibold">선택한 날짜의 크루 일정</h2>
        {selectedDatePlans.length > 0 ? (
          <ul>
            {selectedDatePlans.map((plan) => (
              <li key={plan.crewPlanId} className="text-sm">
                {plan.crewPlanContent} @ {plan.crewPlanPlace || "위치 없음"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">선택한 날짜에 일정이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CrewPlanSection;
