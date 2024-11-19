import React from "react";
import Header from "../_components/Header";
import CrewList from "../_components/CrewList";

const MainSection = () => {
  return (
    <div className="w-full flex-1 flex flex-col justify-start items-center overflow-hidden">
      <Header />
      <CrewList />
    </div>
  );
};

export default MainSection;
