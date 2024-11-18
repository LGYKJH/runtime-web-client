import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import React from "react";

const LeftBar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="pt-[100px] px-8 flex flex-col justify-start items-start gap-">
        <div className="w-full flex flex-row justify-start items-center gap-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" className="w-6 h-6" />
            <AvatarFallback>아바타</AvatarFallback>
          </Avatar>
          <span className="font-normal text-sm">이름</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-6 px-8">
        <Label className="font-normal py-1.5 text-secondary">관리 탭</Label>
        <Label className="font-normal py-1.5 text-secondary">주간 계획</Label>
        <Label className="font-normal py-1.5 text-secondary">목표</Label>
        <Label className="font-normal py-1.5 text-secondary">월간 캘린더</Label>
      </SidebarContent>
    </Sidebar>
  );
};

export default LeftBar;
