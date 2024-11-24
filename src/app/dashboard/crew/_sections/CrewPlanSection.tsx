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
  const [focusedPlan, setFocusedPlan] = useState<CrewPlan | null>(null); // 새로 추가된 상태

  useEffect(() => {
    const fetchCrewCalendar = async () => {
      try {
        // crewId를 요청 본문에 포함하여 fetch 호출
        const response = await fetch(`/api/crew/plan/detail`, {
          method: "POST", // POST 방식 사용
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ crewId }), // 요청 본문에 crewId 포함
        });

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
    setFocusedPlan(null); // 일정 선택 초기화
  };

  const handlePlanClick = (plan: CrewPlan) => {
    setFocusedPlan(plan); // 선택한 일정의 상세정보 보기
  };

  return (
    <div className="w-full flex flex-col items-center gap-y-5 px-10">
      <CrewCalendar
        crewId={crewId}
        onSelectDate={handleDateSelect}
        crewPlans={crewPlans}
      />
      {focusedPlan ? (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">선택한 일정</h2>
          <p>{focusedPlan.crewPlanContent}</p>
          <p>장소: {focusedPlan.crewPlanPlace || "위치 없음"}</p>
          <p>
            시간: {focusedPlan.crewPlanStartDt} ~{" "}
            {focusedPlan.crewPlanEndDt || "없음"}
          </p>
          <div className="flex space-x-2 mt-2">
            <button
              className="text-blue-500"
              onClick={() => console.log(`수정: ${focusedPlan.crewPlanId}`)}
            >
              수정
            </button>
            <button
              className="text-red-500"
              onClick={() => console.log(`삭제: ${focusedPlan.crewPlanId}`)}
            >
              삭제
            </button>
          </div>
        </div>
      ) : selectedDate && selectedPlans.length === 0 ? (
        <CrewCalendarEventForm
          crewId={crewId}
          selectedDate={selectedDate}
          onSubmit={() => setSelectedDate(null)}
          onCancel={() => setSelectedDate(null)}
        />
      ) : (
        selectedPlans.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">선택한 날짜의 일정</h2>
            <ul>
              {selectedPlans.map((plan) => (
                <li
                  key={plan.crewPlanId}
                  className="text-sm flex justify-between items-center cursor-pointer"
                  onClick={() => handlePlanClick(plan)} // 클릭 시 상세 정보 표시
                >
                  {plan.crewPlanContent} @ {plan.crewPlanPlace || "위치 없음"}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default CrewPlanSection;
