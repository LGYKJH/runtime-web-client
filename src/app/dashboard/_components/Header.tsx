import React from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";

import SidebarTirggerIcon from "/public/icons/icon-sidebar-trigger.svg";
import StarIcon from "/public/icons/icon-star.svg";
import { Button } from "@/components/ui/button";

const Header = () => {
  // 로그아웃 요청 함수
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "GET", // 로그아웃 요청
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("로그아웃 실패:", errorData.error || "알 수 없는 오류");
        alert("로그아웃에 실패했습니다.");
        return;
      }

      const responseData = await response.json();
      console.log("로그아웃 성공:", responseData.message);
      alert("로그아웃 성공!");

      // 필요 시 리다이렉트 처리
      window.location.href = "/login"; // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <section className="w-full flex flex-row justify-between items-center px-7 py-5">
      <div className="w-full h-full flex flex-row justify-center items-center gap-x-2">
        <SidebarTrigger />
        <Button
          variant="ghost"
          size="icon"
          className="w-7 h-7 px-0 py-0 gap-0"
          onClick={handleLogout} // 로그아웃 핸들러 연결
        >
          <StarIcon width={20} height={20} />
        </Button>
        <h2>RUNTIME</h2>/<h3>대시보드</h3>
      </div>
    </section>
  );
};

export default Header;
