"use client";

import { useParams } from "next/navigation";

import CrewSection from "../_sections/CrewSection";
import CrewRightBar from "../_components/CrewRightBar";

export default function CrewPage() {
  const { crewId } = useParams();
  return (
    <main className="w-full flex flex-row h-screen overflow-hidden">
      <CrewSection crewId={crewId as string} />
      <CrewRightBar />
    </main>
  );
}
