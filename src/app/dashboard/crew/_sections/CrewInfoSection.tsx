"use client";

import React, { useEffect, useState } from "react";
import CrewInfoHeader from "../_components/CrewInfoHeader";
import CrewInfoIntroduction from "../_components/CrewInfoIntroduction";
import CrewInfoReviewList from "../_components/CrewInfoReviewList";
import { Crew } from "@/app/types/crew";
import { toast } from "sonner";

interface CrewInfoSectionProps {
  crewId: number;
}

const CrewInfoSection = ({ crewId }: CrewInfoSectionProps) => {
  const [crewBasicInfo, setCrewBasicInfo] = useState<Crew>();

  useEffect(() => {
    const fetchCrewBasicInfo = async () => {
      try {
        const response = await fetch(`/api/crew/getBasicInfo/${crewId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: Crew = await response.json();
        setCrewBasicInfo(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCrewBasicInfo();
    console.log(crewBasicInfo);
  }, []);

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
          />
          <CrewInfoReviewList />
          <CrewInfoIntroduction crewGoal={crewBasicInfo.crewGoal} />
        </>
      )}
    </section>
  );
};

export default CrewInfoSection;
