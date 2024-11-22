import React from "react";
import Header from "../../_components/Header";
import CrewDetailSection from "./CrewDetailSection";

interface CrewSectionProps {
  crewId: number;
}

const CrewSection = ({ crewId }: CrewSectionProps) => {
  return (
    <div className="w-full h-full flex-1 flex flex-col justify-start items-center overflow-hidden pb-16">
      <Header />
      <CrewDetailSection crewId={crewId} />
    </div>
  );
};

export default CrewSection;
