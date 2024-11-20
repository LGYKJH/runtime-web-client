import React from "react";
import CrewInfoHeader from "../_components/CrewInfoHeader";
import CrewInfoIntroduction from "../_components/CrewInfoIntroduction";
import CrewInfoReviewList from "../_components/CrewInfoReviewList";

interface CrewInfoSectionProps {
  crewId: string;
}

const CrewInfoSection = ({ crewId }: CrewInfoSectionProps) => {
  return (
    <section className="w-full flex flex-col justify-start items-start px-4 gap-y-12">
      <CrewInfoHeader />
      <CrewInfoReviewList />
      <CrewInfoIntroduction />
    </section>
  );
};

export default CrewInfoSection;
