import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface CrewDetailMenuProps {
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
}

const CrewDetailMenu = ({ menuType, setMenuType }: CrewDetailMenuProps) => {
  const router = useRouter();

  const handleMenuButton = (text: string) => {
    setMenuType(text);
  };

  return (
    <div className="w-full flex flex-row justify-between items-center px-2 py-1">
      <div className="flex flex-row justify-center items-center gap-x-10">
        <Button
          variant="link"
          className={`text-base px-2 py-1 h-7 ${
            menuType === "개요" ? "text-primary" : "text-secondary"
          }`}
          onClick={() => handleMenuButton("개요")}
        >
          <h4 className="font-semibold">개요</h4>
        </Button>
        <Button
          variant="link"
          className={`text-base px-2 py-1 h-7 ${
            menuType === "일정" ? "text-primary" : "text-secondary"
          }`}
          onClick={() => handleMenuButton("일정")}
        >
          <h4 className="font-semibold">일정</h4>
        </Button>
        <Button
          variant="link"
          className={`text-base px-2 py-1 h-7 ${
            menuType === "공지글" ? "text-primary" : "text-secondary"
          }`}
          onClick={() => handleMenuButton("공지글")}
        >
          <h4 className="font-semibold">공지글</h4>
        </Button>
        <Button
          variant="link"
          className={`text-base px-2 py-1 h-7 ${
            menuType === "게시글" ? "text-primary" : "text-secondary"
          }`}
          onClick={() => handleMenuButton("게시글")}
        >
          <h4 className="font-semibold">게시글</h4>
        </Button>
      </div>
    </div>
  );
};

export default CrewDetailMenu;
