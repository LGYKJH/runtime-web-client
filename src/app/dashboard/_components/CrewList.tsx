"use client";

import React, { useState } from "react";
import CrewListMenu from "./CrewListMenu";
import CrewCard from "./CrewCard";

const CrewList = () => {
  const [menuType, setMenuType] = useState<string>("참여중인 크루");

  return (
    <div className="w-full flex flex-col justify-start items-center gap-y-7 pl-10 pr-7 py-7 flex-1 h-full">
      <CrewListMenu menuType={menuType} setMenuType={setMenuType} />
      <div className="w-full h-full flex-1 overflow-y-auto flex flex-col justify-start items-center gap-y-7 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-secondary  scrollbar-track-muted ">
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <CrewCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default CrewList;
