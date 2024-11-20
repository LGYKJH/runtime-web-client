import React from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CrewInfoHeaderProps {
  crewName: string;
  crewType: string;
  crewSize: number;
  crewPlace: string;
}

const CrewInfoHeader = ({
  crewName,
  crewType,
  crewSize,
  crewPlace,
}: CrewInfoHeaderProps) => {
  return (
    <div className="w-full flex flex-row justify-start items-start gap-x-8">
      <div className="w-full flex-1 flex flex-row justify-center items-center rounded-md overflow-hidden">
        <AspectRatio ratio={2 / 1}>
          <Image
            src="/image1.png"
            alt="크루 이미지"
            fill
            className="object-cover"
          />
        </AspectRatio>
      </div>
      <div className="w-full flex-1 flex flex-col justify-start items-start gap-y-6">
        <div className="w-full flex flex-col justify-items-start gap-y-6">
          <Label className="text-[22px] leading-normal whitespace-nowrap">
            {crewName}
          </Label>
          <Separator className="bg-sidebar-border" />
        </div>
        <div className="w-full flex flex-col justify-items-start gap-y-3">
          <div className="w-full flex flex-row justify-start items-center gap-x-6">
            <Badge
              variant="outline"
              className="border-sidebar-border font-normal"
            >
              요일
            </Badge>
            <Label className="font-normal">매주 월요일</Label>
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-x-6">
            <Badge
              variant="outline"
              className="border-sidebar-border font-normal"
            >
              유형
            </Badge>
            <Label className="font-normal">{crewType}</Label>
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-x-6">
            <Badge
              variant="outline"
              className="border-sidebar-border font-normal"
            >
              인원
            </Badge>
            <Label className="font-normal">
              현재 인원: 8, 정원: {crewSize}
            </Label>
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-x-6">
            <Badge
              variant="outline"
              className="border-sidebar-border font-normal"
            >
              장소
            </Badge>
            <Label className="font-normal">{crewPlace}</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewInfoHeader;
