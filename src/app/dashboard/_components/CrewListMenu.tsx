import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface CrewListMenuProps {
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
}

const CrewListMenu = ({ menuType, setMenuType }: CrewListMenuProps) => {
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
            menuType === "크루" ? "text-primary" : "text-secondary"
          }`}
          onClick={() => handleMenuButton("크루")}
        >
          <h4 className="font-semibold">크루</h4>
        </Button>
        <Button
          variant="link"
          className={`text-base px-2 py-1 h-7 ${
            menuType === "내 크루" ? "text-primary" : "text-secondary"
          }`}
          onClick={() => handleMenuButton("내 크루")}
        >
          <h4 className="font-semibold">내 크루</h4>
        </Button>
      </div>
      <Button
        variant="link"
        className="text-sm text-primary font-normal h-6 w-[90px]"
        onClick={() => {
          router.push("/dashboard/createCrew");
        }}
      >
        <h4>크루 만들기</h4>
        <ChevronRight size={14} />
      </Button>
    </div>
  );
};

export default CrewListMenu;
