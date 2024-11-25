"use client";

import React, { useEffect, useState } from "react";
import CrewInfoHeader from "../_components/CrewInfoHeader";
import CrewInfoIntroduction from "../_components/CrewInfoIntroduction";
import CrewInfoReviewList from "../_components/CrewInfoReviewList";
import { Crew } from "@/app/types/crew";
import { toast } from "sonner";
import Spinner from "@/app/_components/Spinner";

interface CrewInfoSectionProps {
  crewId: number;
  currentMemberNumber: number;
}

const CrewInfoSection = ({
  crewId,
  currentMemberNumber,
}: CrewInfoSectionProps) => {
  const [crewBasicInfo, setCrewBasicInfo] = useState<Crew>();
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchCrewBasicInfo = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const response = await fetch(`/api/crew/getBasicInfo/${crewId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: Crew = await response.json();
        setCrewBasicInfo(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    fetchCrewBasicInfo();
  }, [crewId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col justify-start items-start px-4 gap-y-12">
      {crewBasicInfo && (
        <>
          <CrewInfoHeader
            crewName={crewBasicInfo.crewName}
            crewType={crewBasicInfo.crewType}
            crewSize={crewBasicInfo.crewSize}
            crewPlace={crewBasicInfo.crewPlace}
            crewProfileImage={crewBasicInfo.crewProfileImage}
            currentMemberNumber={currentMemberNumber}
          />
          <CrewInfoReviewList />
          <CrewInfoIntroduction crewGoal={crewBasicInfo.crewGoal} />
        </>
      )}
    </section>
  );
};

export default CrewInfoSection;
