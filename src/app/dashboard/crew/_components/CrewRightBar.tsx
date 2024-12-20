"use client";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";

import { CrewMember } from "@/app/types/crew";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/app/stores/userStore";

import CrewMemberCard from "./CrewMemberCard";
import Spinner from "@/app/_components/Spinner";

interface CrewRightBarProps {
  crewId: number;
  currentMemberNumber: number;
  setCurrentMemberNumber: React.Dispatch<React.SetStateAction<number>>;
}

const CrewRightBar = ({
  crewId,
  currentMemberNumber,
  setCurrentMemberNumber,
}: CrewRightBarProps) => {
  const user = useUserStore((state) => state.user);
  const [crewMemberInfo, setCrewMemberInfo] = useState<CrewMember[]>([]);
  const [isAlreadyMember, setIsAlreadyMember] = useState<boolean>(false);
  const [myRole, setMyRole] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchCrewMemberInfo = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const response = await fetch(`/api/crew/getCrewMember/${crewId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const crewMemberList: CrewMember[] = data.combinedData;
        setCrewMemberInfo(crewMemberList);
        setCurrentMemberNumber(data.currentMemberNumber);
        setMyRole(data.userRole);
        if (data.isUserInCrew || data.isUserInWaiting) {
          setIsAlreadyMember(true);
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    if (user && user.userId) {
      document.cookie = `user_id=${user.userId}; Path=/; SameSite=Lax`;
      fetchCrewMemberInfo();
    }
  }, [crewId, user]);

  const handleJoinCrewButton = async () => {
    try {
      const requestBody = {
        crewId: crewId,
        userId: user.userId,
      };

      const response = await fetch("/api/crew/joinCrew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast.success("크루 신청이 완료되었습니다!");
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("요청 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="relative min-w-[320px] max-w-[320px] flex flex-col justify-start items-center gap-y-4 px-4 py-4 border-l-[0.5px] border-l-sidebar-border">
      <div className="w-full px-1 pt-1.5 pb-2 gap-y-1 flex flex-col justify-start items-start">
        <h4 className="pb-2">크루 멤버</h4>
        <div className="w-full flex flex-row justify-between items-center">
          <Label className="font-normal py-1.5 text-secondary">멤버 목록</Label>
          <Label className="font-normal py-1.5 text-secondary text-xs">
            {currentMemberNumber}
          </Label>
        </div>
        <div className="pt-0 pb-4 flex flex-col justify-start items-start gap-1.5 w-full">
          {crewMemberInfo.length > 0 ? (
            crewMemberInfo.map((member) => (
              <CrewMemberCard
                key={member.crewMemberId}
                crewMemberId={member.crewMemberId}
                userName={member.userName}
                userProfile={member.userProfile}
                crewMemberRole={member.crewMemberRole.toString()}
                myRole={myRole}
              />
            ))
          ) : (
            <span className="text-gray-500">멤버가 없습니다.</span>
          )}
        </div>
      </div>
      {!isAlreadyMember && (
        <div className="absolute bottom-[56px] w-full flex flex-row justify-center items-center">
          <Button onClick={handleJoinCrewButton} className="w-[88%]">
            크루 참가하기
          </Button>
        </div>
      )}
    </section>
  );
};

export default CrewRightBar;
