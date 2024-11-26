"use client";

import React from "react";
import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Ellipsis } from "lucide-react";

import { useRouter } from "next/navigation";
import MemberOptionDialog from "./MemberOptionDialog";

interface CrewMemberCardProps {
  crewMemberId: number;
  userName: string;
  userProfile: string | null;
  crewMemberRole: string;
  myRole: number;
}

const CrewMemberCard = ({
  crewMemberId,
  userName,
  userProfile,
  crewMemberRole,
  myRole,
}: CrewMemberCardProps) => {
  const router = useRouter();

  const handleMemberAcceptButton = async () => {
    try {
      const requestBody = {
        crewMemberId: crewMemberId,
      };

      const response = await fetch("/api/crew/acceptCrewMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast.success("멤버 수락이 완료되었습니다!");
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("요청 중 오류가 발생했습니다.");
    }
  };

  const handleMemberRejectButton = async () => {
    try {
      const requestBody = {
        crewMemberId: crewMemberId,
      };

      const response = await fetch("/api/crew/rejectCrewMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast.success("멤버를 성공적으로 내보냈습니다.");
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("요청 중 오류가 발생했습니다.");
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "1":
        return { label: "크루장", color: "text-blue-500" };
      case "2":
        return {
          label: "크루원",
          color: "text-zinc-400",
          rejectButton: (
            <MemberOptionDialog
              triggerText="크루원 내보내기"
              titleText="크루원을 정말 내보내시겠습니까?"
              okText="확인"
              cancelText="취소"
              okFunction={handleMemberRejectButton}
            />
          ),
        };
      case "3":
        return {
          label: "대기자",
          color: "text-yellow-500",
          acceptButton: (
            <MemberOptionDialog
              triggerText="크루 승인"
              titleText="크루 멤버 신청을 수락하시겠습니까?"
              okText="수락"
              cancelText="거절"
              okFunction={handleMemberAcceptButton}
              cancelFunction={handleMemberRejectButton}
            />
          ),
        };
      default:
        return { label: "알 수 없음", color: "text-red-500" };
    }
  };

  const roleInfo = getRoleLabel(crewMemberRole);

  return (
    <div className="flex flex-row justify-between items-center w-full px-2 py-2 rounded-lg hover:bg-muted">
      <div className="flex flex-row justify-start items-center gap-x-3">
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={userProfile || "/default-avatar.png"}
            alt={userName}
          />
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-items-start">
          <span className="font-semibold text-sm text-primary">{userName}</span>
          <span className={`text-xs font-normal ${roleInfo.color}`}>
            {roleInfo.label}
          </span>
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Ellipsis
            width={16}
            height={16}
            className="text-secondary cursor-pointer outline-none focus:outline-none hover:outline-none border-none focus:border-none hover:border-none"
            tabIndex={-1}
          />
        </PopoverTrigger>
        <PopoverContent
          className="w-[264px] shadow border-muted flex flex-col justify-start items-start gap-y-2"
          side="bottom"
          align="end"
          sideOffset={20}
        >
          {myRole == 1 && (roleInfo.acceptButton || roleInfo.rejectButton) ? (
            <>
              {roleInfo.acceptButton && roleInfo.acceptButton}
              {roleInfo.rejectButton && roleInfo.rejectButton}
            </>
          ) : (
            <span className="text-secondary text-sm">추가 기능 구현 중</span>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CrewMemberCard;
