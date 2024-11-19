"use client";

import React, { useState } from "react";
import CrewDetailMenu from "../_components/CrewDetailMenu";

interface CrewDetailSectionProps {
  crewId: string;
}

const CrewDetailSection = ({ crewId }: CrewDetailSectionProps) => {
  const [menuType, setMenuType] = useState<string>("개요");

  return (
    <section className="w-full flex flex-col justify-start items-center gap-y-7 pl-10 pr-7 py-7 flex-1 h-full">
      <CrewDetailMenu menuType={menuType} setMenuType={setMenuType} />

      <h1>크루 ID: {crewId}</h1>
    </section>
  );
};

export default CrewDetailSection;
