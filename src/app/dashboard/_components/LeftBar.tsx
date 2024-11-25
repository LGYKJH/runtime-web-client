"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import React from "react";
import { useUserStore } from "@/app/stores/userStore";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";

const LeftBar = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // 날짜 선택 상태
  const [selected, setSelected] = useState<Date | undefined>();

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
            <AvatarFallback>
              {user?.userNickname?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <span className="font-normal text-sm">
            {user?.userNickname || "이름 없음"}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-6 px-8">
        <div className="flex flex-col">
          <Label className="font-normal py-1.5 text-secondary">관리 탭</Label>
        </div>
        <div className="h-4"></div>
        <div>
          <Label className="font-normal py-1.5 text-secondary">목표</Label>
          <div className="h-3"></div>
          <p className="text-sm text-primary">
            {user?.userGoal || "내용 없음"}
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <Label className="font-normal py-1.5 text-secondary">
            월간 캘린더
          </Label>
          <div className="h-4"></div>
          <Calendar
            className="text-xs rounded-md border"
            selected={selected} // 선택된 날짜 상태
            onSelect={setSelected} // 날짜 선택 시 상태 업데이트
            classNames={{
              table: "w-full border-collapse",
              day: "h-6 w-6 p-0 text-xs", // 날짜 셀 크기 조정
              nav_button: "w-5 h-5", // 이전/다음 버튼 크기 조정
              caption_label: "text-xs font-medium", // 캘린더 제목 크기 축소
              head_cell: "text-muted-foreground text-[10px] w-full font-normal", // 요일 헤더 크기 축소
            }}
          />
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default LeftBar;
