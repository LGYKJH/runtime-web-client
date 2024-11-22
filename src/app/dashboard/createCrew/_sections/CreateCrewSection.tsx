import React, { Dispatch, SetStateAction } from "react";
import Header from "../../_components/Header";
import CreateCrewForm from "../_components/CreateCrewForm";

interface CreateCrewSectionProps {
  crewName: string;
  setCrewName: Dispatch<SetStateAction<string>>;
  crewGoal: string;
  setCrewGoal: Dispatch<SetStateAction<string>>;
  crewProfile: File | null;
  setCrewProfile: Dispatch<SetStateAction<File | null>>;
  place: string;
  setPlace: Dispatch<SetStateAction<string>>;
  handleCreateAIDesc: () => Promise<void>;
}

const CreateCrewSection = ({
  crewName,
  setCrewName,
  crewGoal,
  setCrewGoal,
  crewProfile,
  setCrewProfile,
  place,
  setPlace,
  handleCreateAIDesc,
}: CreateCrewSectionProps) => {
  return (
    <div className="w-full h-full flex-1 flex flex-col justify-start items-center overflow-hidden pb-16">
      <Header />
      <CreateCrewForm
        crewName={crewName}
        setCrewName={setCrewName}
        crewGoal={crewGoal}
        setCrewGoal={setCrewGoal}
        crewProfile={crewProfile}
        setCrewProfile={setCrewProfile}
        place={place}
        setPlace={setPlace}
        handleCreateAIDesc={handleCreateAIDesc}
      />
    </div>
  );
};

export default CreateCrewSection;
