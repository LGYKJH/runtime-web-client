"use client";

import React, { useEffect, useState } from "react";
import CrewCalendar from "../../_components/CrewCalendar";
import { CrewPlan } from "@/app/types/crewPlan";
import { CrewCalendarEventForm } from "@/app/dashboard/_components/CrewCalendarEventForm";
import { toast } from "sonner";
import Spinner from "@/app/_components/Spinner";

interface CrewPlanSectionProps {
  crewId: number;
}

const CrewPlanSection = ({ crewId }: CrewPlanSectionProps) => {
  const [crewPlans, setCrewPlans] = useState<CrewPlan[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPlans, setSelectedPlans] = useState<CrewPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchCrewCalendar = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const response = await fetch(`/api/crew/plan/detail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ crewId }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: CrewPlan[] = await response.json();
        setCrewPlans(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    fetchCrewCalendar();
  }, [crewId, selectedDate]);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);

    if (date) {
      const filteredPlans = crewPlans.filter((plan) => {
        const eventDate = new Date(plan.crewPlanStartDt);
        return eventDate.toDateString() === date.toDateString();
      });

      setSelectedPlans(filteredPlans);
    } else {
      setSelectedPlans([]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-row justify-start items-start gap-y-5 px-10">
      {/* 캘린더 컴포넌트 */}
      <CrewCalendar
        crewId={crewId}
        onSelectDate={handleDateSelect}
        crewPlans={crewPlans}
      />

      <div className="w-2/5">
        {selectedDate && selectedPlans && (
          <div>
            <div className="w-full flex flex-col border rounded-md py-4 px-4">
              <h2 className="text-lg font-semibold">
                {selectedDate.toDateString()} 일정
              </h2>
              {selectedPlans.length > 0 ? (
                <ul>
                  {selectedPlans.map((plan, index) => (
                    <li
                      key={`${plan.crewPlanId}-${index}`}
                      className="text-sm border-b py-2"
                    >
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
            </div>
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
