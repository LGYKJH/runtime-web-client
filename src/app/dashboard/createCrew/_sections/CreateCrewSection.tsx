import React from "react";
import Header from "../../_components/Header";
import CrewList from "../../_components/CrewList";
import CreateCrewForm from "../_components/CreateCrewForm";

const CreateCrewSection = () => {
  return (
    <div className="w-full h-full flex-1 flex flex-col justify-start items-center overflow-hidden pb-16">
      <Header />
      <CreateCrewForm />
    </div>
  );
};

export default CreateCrewSection;
