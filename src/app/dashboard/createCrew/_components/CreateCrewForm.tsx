import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const CreateCrewForm = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-y-4 pl-10 pr-7 py-7 flex-1 h-full">
      <div className="w-full flex flex-row justify-between items-center px-2 pt-1 pb-4">
        <h4 className="font-semibold">새 크루 만들기</h4>
      </div>
      <Input
        type="text"
        placeholder="제목"
        className="border-none text-3xl font-medium text-primary px-2 py-0"
      />
      <Separator />
      <div className="w-full h-full flex-1 flex flex-row justify-start items-start">
        <Separator orientation="vertical" />
        <Textarea
          placeholder="크루 목표를 적어주세요..."
          id="goal"
          className="resize-none border-none md:text-base text-primary"
        />
      </div>
    </div>
  );
};

export default CreateCrewForm;
