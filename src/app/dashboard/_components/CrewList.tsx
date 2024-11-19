"use client";

import React, { useState } from "react";
import CrewListMenu from "./CrewListMenu";

const CrewList = () => {
  const [menuType, setMenuType] = useState<string>("크루");

  return (
    <div className="w-full flex flex-col justify-start items-center gap-y-7 px-10 py-7">
      <CrewListMenu menuType={menuType} setMenuType={setMenuType} />
    </div>
  );
};

export default CrewList;
