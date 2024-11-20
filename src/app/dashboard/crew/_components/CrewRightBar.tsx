"use client";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CrewRightBar = () => {
  // 크루 멤버 배열 (이름과 역할 포함)
  const members = [
    { name: "홍길동", role: "크루장", image: "/path/to/avatar1.png" },
    { name: "김철수", role: "크루원", image: "/path/to/avatar2.png" },
    { name: "이영희", role: "크루원", image: "/path/to/avatar3.png" },
    { name: "박민수", role: "크루원", image: "/path/to/avatar4.png" },
    { name: "최수진", role: "크루원", image: "/path/to/avatar5.png" },
    { name: "정다영", role: "크루원", image: "/path/to/avatar6.png" },
    { name: "한지훈", role: "크루원", image: "/path/to/avatar7.png" },
    { name: "오은영", role: "크루원", image: "/path/to/avatar8.png" },
  ];

  return (
    <section className="relative min-w-[320px] max-w-[320px] flex flex-col justify-start items-center gap-y-4 px-4 py-4 border-l-[0.5px] border-l-sidebar-border">
      <div className="w-full px-1 pt-1.5 pb-2 gap-y-1 flex flex-col justify-start items-start">
        <h4 className="pb-2">크루 멤버</h4>
        <Label className="font-normal py-1.5 text-secondary">멤버 목록</Label>
        <div className="pt-0 pb-4 flex flex-col justify-start items-start gap-1.5 w-full">
          {members.map((member, index) => (
            <div
              key={member.name}
              className="flex items-center gap-x-3 w-full px-2 py-2 rounded-lg hover:bg-muted"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={member.name}
                />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{member.name}</span>
                {index === 0 ? (
                  <span className="text-xs text-blue-500 font-medium">
                    {member.role}
                  </span>
                ) : (
                  <span className="text-xs text-zinc-400">{member.role}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-[56px] w-full flex flex-row justify-center items-center">
        <Button className="w-[88%]">크루 참가하기</Button>
      </div>
    </section>
  );
};

export default CrewRightBar;
