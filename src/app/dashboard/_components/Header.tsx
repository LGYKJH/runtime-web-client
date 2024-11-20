"use client";

import React from "react";
import { useThemeStore } from "@/app/_stores/themeStore";

import { SidebarTrigger } from "@/components/ui/sidebar";

import LogoutIcon from "/public/icons/icon-unlock.svg";
import LogoutIconDark from "/public/icons/icon-unlock-dark.svg";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/app/_components/DarkModeToggle";
import HeaderBreadcrumb from "./HeaderBreadcrumb";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Header = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("로그아웃 실패:", errorData.error || "알 수 없는 오류");
        alert("로그아웃에 실패했습니다.");
        return;
      }

      const responseData = await response.json();
      console.log("로그아웃 성공:", responseData.message);
      toast.success(responseData.message);
      router.push("/users/login");
    } catch (error) {
      console.log("로그아웃 중 오류 발생:", error);
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <section className="w-full flex flex-row justify-between items-center px-7 py-5 border-b-[0.5px] border-b-sidebar-border">
      <div className="flex flex-row justify-center items-center gap-x-2">
        <SidebarTrigger />
        <HeaderBreadcrumb />
      </div>
      <div className="h-full flex flex-row justify-center items-center gap-x-10">
        <DarkModeToggle />
        <Button
          variant="link"
          className="flex flex-row justify-center items-center h-7 px-0 py-0 gap-2 no-underline hover:no-underline [&_svg]:size-4"
          onClick={handleLogout}
        >
          {isDarkMode ? (
            <LogoutIconDark width={16} height={16} />
          ) : (
            <LogoutIcon width={16} height={16} />
          )}
          <h3>LOGOUT</h3>
        </Button>
      </div>
    </section>
  );
};

export default Header;
