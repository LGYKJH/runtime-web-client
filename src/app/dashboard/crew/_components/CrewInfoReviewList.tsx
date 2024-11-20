import React from "react";
import CrewInfoReviewCard from "./CrewInfoReviewCard";
import { Label } from "@/components/ui/label";

const CrewInfoReviewList = () => {
  return (
    <div className="w-full flex flex-col justify-items-start gap-y-4">
      <Label className="font-bold text-primary text-md">후기</Label>
      <div className="w-full overflow-x-scroll scrollbar-thin flex flex-col justify-items-start">
        <div className="w-max flex flex-row justify-start items-center gap-x-4 pb-4">
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
          <CrewInfoReviewCard />
        </div>
      </div>
    </div>
  );
};

export default CrewInfoReviewList;
