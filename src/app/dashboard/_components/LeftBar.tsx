"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import React from "react";
import { useUserStore } from "@/app/stores/userStore";
import { useEffect } from "react";


const LeftBar = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => { 
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/getUserInfo", {
          method: "GET",
          credentials: "include", // 쿠키 포함
        });

        if (!response.ok) {
          console.error(
            `사용자 정보를 가져오는 데 실패했습니다. 상태 코드: ${response.status}, 메시지: ${response.statusText}`
          );
          return;
        }

        const userData = await response.json();
        setUser(userData); // Zustand 상태 업데이트
      } catch (error) {
        console.error("사용자 정보 로드 중 오류 발생:", error);
      }
    };

    // 사용자 정보 로드
    fetchUserData();
  }, [setUser]);

  return (
    <Sidebar>
      <SidebarHeader className="pt-[100px] px-8 flex flex-col justify-start items-start gap-">
        <div className="w-full flex flex-row justify-start items-center gap-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={user?.userProfile || "https://github.com/shadcn.png"}
              className="w-6 h-6"
            />
            <AvatarFallback>{user?.userNickname?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <span className="font-normal text-sm">{user?.userNickname || "이름 없음"}</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-6 px-8">
        <div className="flex flex-col">
          <Label className="font-normal py-1.5 text-secondary">관리 탭</Label>
          <p className="text-sm text-muted-foreground">{user?.userGoal || "내용 없음"}</p>
        </div>
        <div>
          <Label className="font-normal py-1.5 text-secondary">주간 계획</Label>
          <p className="text-sm text-muted-foreground">{user?.userGoal || "내용 없음"}</p>
        </div>
        <Label className="font-normal py-1.5 text-secondary">목표</Label>
        <Label className="font-normal py-1.5 text-secondary">월간 캘린더</Label>
      </SidebarContent>
    </Sidebar>
  );
};

export default LeftBar;
