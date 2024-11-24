import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CrewMemberCardProps {
  crewMemberId: number;
  userName: string;
  userProfile: string | null;
  crewMemberRole: string;
}

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
        return { label: "대기자", color: "text-yellow-500" };
      default:
        return { label: "알 수 없음", color: "text-red-500" };
    }
  };

  const roleInfo = getRoleLabel(crewMemberRole);

  return (
    <div className="flex items-center gap-x-3 w-full px-2 py-2 rounded-lg hover:bg-muted">
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={userProfile || "/default-avatar.png"}
          alt={userName}
        />
        <AvatarFallback>{userName[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-semibold text-sm">{userName}</span>
        <span className={`text-xs font-medium ${roleInfo.color}`}>
          {roleInfo.label}
        </span>
      </div>
    </div>
  );
};

export default CrewMemberCard;
