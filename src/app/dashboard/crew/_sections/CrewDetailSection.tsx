"use client";

import React, { useState } from "react";
import CrewDetailMenu from "../_components/CrewDetailMenu";
import CrewInfoSection from "./CrewInfoSection";
import CrewPlanSection from "./CrewPlanSection";

interface CrewDetailSectionProps {
  crewId: string;
}

const CrewDetailSection = ({ crewId }: CrewDetailSectionProps) => {
  const [menuType, setMenuType] = useState<string>("개요");

  return (
    <section className="w-full flex flex-col justify-start items-center gap-y-7 pl-10 pr-10 py-7 flex-1 h-full overflow-y-auto scrollbar-none">
      <CrewDetailMenu menuType={menuType} setMenuType={setMenuType} />
      {menuType === "개요" && 
        <CrewInfoSection crewId={crewId} />
      }
      {menuType === "일정" &&
        <CrewPlanSection crewId={crewId} />
      }
    </section>
  );
};

export default CrewDetailSection;
