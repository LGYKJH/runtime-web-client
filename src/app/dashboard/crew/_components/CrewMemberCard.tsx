import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface CrewMemberCardProps {
  crewMemberId: number;
  userName: string;
  userProfile: string | null;
  crewMemberRole: string;
}

const AcceptMenu = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full flex flex-row justify-start items-center py-1.5 px-2 font-normal"
          variant="ghost"
        >
          크루 승인
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-primary font-medium text-base">
          크루 멤버 신청을 수락하시겠습니까?
        </DialogTitle>
        <DialogFooter>
          <Button size="sm" variant="default">
            수락
          </Button>
          <Button size="sm" variant="outline">
            거절
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CrewMemberCard = ({
  crewMemberId,
  userName,
  userProfile,
  crewMemberRole,
}: CrewMemberCardProps) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case "1":
        return { label: "크루장", color: "text-blue-500" };
      case "2":
        return { label: "크루원", color: "text-zinc-400" };
      case "3":
        return {
          label: "대기자",
          color: "text-yellow-500",
          acceptButton: <AcceptMenu />, // 컴포넌트를 직접 JSX로 반환
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
          {roleInfo.acceptButton && roleInfo.acceptButton}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CrewMemberCard;
