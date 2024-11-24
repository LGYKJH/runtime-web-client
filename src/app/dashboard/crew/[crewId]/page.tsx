"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import CrewSection from "../_sections/CrewSection";
import CrewRightBar from "../_components/CrewRightBar";

export default function CrewPage() {
  const { crewId } = useParams();
  const [currentMemberNumber, setCurrentMemberNumer] = useState<number>(0);

  return (
    <main className="w-full flex flex-row h-screen overflow-hidden">
      <CrewSection
        crewId={parseInt(crewId as string)}
        currentMemberNumber={currentMemberNumber}
      />
      <CrewRightBar
        crewId={parseInt(crewId as string)}
        currentMemberNumber={currentMemberNumber}
        setCurrentMemberNumber={setCurrentMemberNumer}
      />
    </main>
  );
}
