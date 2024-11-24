"use client";

import React, { useState, useEffect } from "react";

import { Crew } from "@/app/types/crew";

import CrewCard from "./CrewCard";
import CrewListMenu from "./CrewListMenu";
import { toast } from "sonner";
import { useUserStore } from "@/app/stores/userStore";

const CrewList = () => {
  const user = useUserStore((state) => state.user);
  const [crewList, setCrewList] = useState<Crew[]>([]);
  const [myCrew, setMyCrew] = useState<{ crewId: number; role: number }[]>([]);
  const [menuType, setMenuType] = useState<string>("참여중인 크루");

  // Fetch 전체 크루 리스트
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
  }, []);

  useEffect(() => {
    const fetchMyCrew = async () => {
      try {
        const response = await fetch("/api/crew/getMyCrew");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: { crewId: number; role: number }[] = await response.json();
        setMyCrew(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (user && user.userId) {
      document.cookie = `user_id=${user.userId}; Path=/; SameSite=Lax`;
      fetchMyCrew();
    }
  }, [user]);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-y-7 pl-10 pr-7 py-7 flex-1 h-full">
      <CrewListMenu menuType={menuType} setMenuType={setMenuType} />
      <div className="w-full overflow-y-scroll scrollbar-none flex flex-col justify-start items-center gap-y-7">
        {crewList.map((crew) => {
          const userRole = myCrew.find((uc) => uc.crewId === crew.crewId)?.role;

          console.log(userRole);

          return (
            <CrewCard
              key={crew.crewId}
              crewId={crew.crewId}
              crewName={crew.crewName}
              crewType={crew.crewType}
              crewGoal={crew.crewGoal}
              crewSize={crew.crewSize}
              crewProfileImage={crew.crewProfileImage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CrewList;
