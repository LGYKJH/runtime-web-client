"use client";

import React, { useState, useEffect } from "react";

import { Crew } from "@/app/types/crew";
import CrewCard from "./CrewCard";
import CrewListMenu from "./CrewListMenu";
import { toast } from "sonner";
import { useUserStore } from "@/app/stores/userStore";
import { useFilterStore } from "@/app/_stores/filterStore";

const CrewList = () => {
  const user = useUserStore((state) => state.user);

  const { selectedDays, selectedSports, selectedCrewSize, selectedDistrict } =
    useFilterStore(); // 필터 상태 불러오기

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

  // 필터 적용 함수
  const applyFilters = (crew: Crew) => {
    console.log(crew);

    const matchesDays =
      !selectedDays.length ||
      crew.crewCalendarTitle
        .split(", ")
        .some((day) => selectedDays.includes(day));
    const matchesSports =
      !selectedSports.length ||
      crew.crewType.split(", ").some((type) => selectedSports.includes(type));
    const matchesCrewSize =
      !selectedCrewSize ||
      (crew.crewSize &&
        parseInt(selectedCrewSize.split(" ~ ")[0]) <= crew.crewSize &&
        (selectedCrewSize.includes("20명 이상")
          ? crew.crewSize >= 20
          : crew.crewSize <= parseInt(selectedCrewSize.split(" ~ ")[1])));
    const matchesDistrict =
      !selectedDistrict || crew.crewPlace?.includes(selectedDistrict);

    return matchesDays && matchesSports && matchesCrewSize && matchesDistrict;
  };

  const filteredCrewList = crewList.filter(applyFilters);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-y-7 pl-10 pr-7 py-7 flex-1 h-full">
      <CrewListMenu menuType={menuType} setMenuType={setMenuType} />
      {menuType === "참여중인 크루" ? (
        <div className="w-full overflow-y-scroll scrollbar-none flex flex-col justify-start items-center gap-y-7">
          {filteredCrewList.map((crew) => {
            const userRole = myCrew.find(
              (uc) => uc.crewId === crew.crewId
            )?.role;

            return (
              <CrewCard
                key={crew.crewId}
                crewId={crew.crewId}
                crewName={crew.crewName}
                crewType={crew.crewType}
                crewGoal={crew.crewGoal}
                crewSize={crew.crewSize}
                crewProfileImage={crew.crewProfileImage}
                userRole={userRole ?? 4}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full overflow-y-scroll scrollbar-none flex flex-col justify-start items-center gap-y-7">
          {filteredCrewList
            .filter((crew) => myCrew.some((uc) => uc.crewId === crew.crewId))
            .map((crew) => {
              const userRole = myCrew.find(
                (uc) => uc.crewId === crew.crewId
              )?.role;

              return (
                <CrewCard
                  key={crew.crewId}
                  crewId={crew.crewId}
                  crewName={crew.crewName}
                  crewType={crew.crewType}
                  crewGoal={crew.crewGoal}
                  crewSize={crew.crewSize}
                  crewProfileImage={crew.crewProfileImage}
                  userRole={userRole ?? 4}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CrewList;
