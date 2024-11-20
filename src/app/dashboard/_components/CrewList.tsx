"use client";

import React, { useState, useEffect } from "react";

import { Crew } from "@/app/types/crew";

import CrewCard from "./CrewCard";
import CrewListMenu from "./CrewListMenu";
import { toast } from "sonner";
import Link from "next/link";

const CrewList = () => {
  const [crewList, setCrewList] = useState<Crew[]>([]);
  const [menuType, setMenuType] = useState<string>("참여중인 크루");

  useEffect(() => {
    const fetchCrewList = async () => {
      try {
        const response = await fetch("/api/crew/list");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: Crew[] = await response.json();
        setCrewList(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCrewList();
    console.log(crewList);
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-y-7 pl-10 pr-7 py-7 flex-1 h-full">
      <CrewListMenu menuType={menuType} setMenuType={setMenuType} />
      {crewList.map((crew) => (
        <CrewCard
          key={crew.crewId}
          crewId={crew.crewId}
          crewName={crew.crewName}
          crewType={crew.crewType}
          crewGoal={crew.crewGoal}
          crewSize={crew.crewSize}
        />
      ))}
    </div>
  );
};

export default CrewList;
