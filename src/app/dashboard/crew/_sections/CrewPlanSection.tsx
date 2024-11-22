"use client";

import React, { useState } from "react";
import CrewDetailMenu from "../_components/CrewDetailMenu";
import CrewCalendar from "../../_components/CrewCalendar";

interface CrewPlanSectionProps {
  crewPlanId: number;
}

const CrewPlanSection = ({ crewPlanId }: CrewPlanSectionProps) => {
  const [menuType, setMenuType] = useState<string>("일정");

  return (
    <section className="w-full flex flex-col justify-start items-center gap-y-7 pl-10 pr-10 py-7 flex-1 h-full overflow-y-auto scrollbar-none">
      <CrewDetailMenu menuType={menuType} setMenuType={setMenuType} />
      <CrewCalendar />
    </section>
  );
};

export default CrewPlanSection;