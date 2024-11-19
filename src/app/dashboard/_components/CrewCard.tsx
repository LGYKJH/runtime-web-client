import { Badge } from "@/components/ui/badge";
import React from "react";

interface CrewCardProps {
  title: string;
  imageURL: string;
}

const CrewCard = () => {
  return (
    <div className="w-full flex flex-row justify-start items-center gap-x-4 cursor-pointer">
      <div className="overflow-hidden rounded-lg">
        <img
          alt="이미지"
          className="w-[240px] h-[128px] object-cover"
          src="https://placehold.co/240x128"
        />
      </div>
      <div className="bg-muted h-full flex-1 flex flex-col justify-start items-start px-6 py-6 rounded-lg">
        <div className="w-full flex flex-row justify-between items-center">
          <h5 className="text-base font-bold text-primary">
            한강 크루팀 ( 신입 모집 )
          </h5>
          <Badge
            variant="secondary"
            className="w-16 h-6 flex flex-row justify-center items-center text-background font-light"
          >
            대기 중
          </Badge>
        </div>
        <span className="pt-2 text-sm text-secondary">
          퇴근 후 부담없이 즐기는 루틴 런닝! **초보러너 환영
        </span>
        <div className="w-full flex flex-row justify-start items-center mt-4 gap-x-6">
          <span className="text-xs text-secondary font-normal">
            &#35; 마라톤
          </span>
          <span className="text-xs text-secondary font-normal">
            &#35; 한강대로변
          </span>
          <span className="text-xs text-secondary font-normal">
            &#35; 매주 금요일 오후 5시부터 7시
          </span>
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
