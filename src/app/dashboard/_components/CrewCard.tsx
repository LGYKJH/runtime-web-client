"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

interface CrewCardProps {
  crewId: string;
  crewName: string;
  crewType: string;
  crewGoal: string;
  crewSize: number;
  crewProfileImage: string;
}

const CrewCard = ({
  crewId,
  crewName,
  crewType,
  crewGoal,
  crewSize,
  crewProfileImage,
}: CrewCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    toast.info("크루 상세 페이지로 이동합니다.");
    setTimeout(() => {
      router.push(`/dashboard/crew/${crewId}`);
    }, 500);
  };

  return (
    <div
      className="w-full flex flex-row justify-start items-center gap-x-4 cursor-pointer"
      onClick={handleCardClick}
    >
      {crewProfileImage ? (
        <picture className="relative w-[240px] h-[128px] overflow-hidden rounded-md">
          <Image src={crewProfileImage} alt="크루 프로필 이미지" className="object-cover" fill />
        </picture>
      ) : (
        <picture className="relative w-[240px] h-[128px] overflow-hidden rounded-md">
          <Image
            src="/images/bg-run-1.jpg"
            alt="크루 프로필 이미지"
            className="object-cover"
            fill
          />
        </picture>
      )}
      <div className="bg-muted h-full flex-1 flex flex-col justify-start items-start px-6 py-6 rounded-lg mr-6">
        <div className="w-full flex flex-row justify-between items-center">
          <h5 className="text-base font-bold text-primary">{crewName}</h5>
          <Badge
            variant="secondary"
            className="w-16 h-6 flex flex-row justify-center items-center text-background font-light"
          >
            대기 중
          </Badge>
        </div>
        <div className="w-full max-w-full flex flex-row justify-items-start">
          <span className="pt-2 text-sm text-secondary inline-block w-[400px] truncate">
            {crewGoal}
          </span>
        </div>
        <div className="w-full flex flex-row justify-start items-center mt-4 gap-x-6">
          <span className="text-xs text-secondary font-normal">&#35; {crewType}</span>
          <span className="text-xs text-secondary font-normal">&#35; 정원 &#58; {crewSize} 명</span>
          <span className="text-xs text-secondary font-normal">
            &#35; 정기 러닝 &#58; 매주 월요일
          </span>
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
