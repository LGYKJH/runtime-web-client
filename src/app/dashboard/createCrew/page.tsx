"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import CreateRightBar from "./_components/CreateRightBar";
import CreateCrewSection from "./_sections/CreateCrewSection";

export default function CreateCrewPage() {
  const router = useRouter();

  const [crewProfile, setCrewProfile] = useState<File | null>(null);
  const [crewName, setCrewName] = useState<string>("");
  const [crewGoal, setCrewGoal] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [days, setDays] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [crewSize, setCrewSize] = useState<number>();

  const handleCreateCrew = async () => {
    try {
      if (!crewName || !crewGoal || !place || !crewSize) {
        toast.warning("크루 생성에 필요한 정보를 모두 입력해주세요!");
        return;
      }

      // 요청 본문 생성
      const requestBody = {
        crewName,
        types,
        crewSize,
        crewGoal,
        places: place,
        crewProfile: null,
      };

      console.log("전송 데이터:", requestBody);

      // API 요청
      const response = await fetch("/api/crew/createCrew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // 응답 처리
      if (response.ok) {
        const data = await response.json();
        console.log("생성 성공:", data);
        toast.success("크루가 성공적으로 생성되었습니다!");
        setTimeout(() => {
          router.push("/dashboard");
        });
      } else {
        const error = await response.json();
        console.error("생성 실패:", error);
        toast.error(`생성 실패: ${error.message}`);
      }
    } catch (error) {
      console.error("요청 오류:", error);
      toast.error("요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="w-full flex flex-row h-screen overflow-hidden">
      <CreateCrewSection
        crewProfile={crewProfile}
        setCrewProfile={setCrewProfile}
        crewName={crewName}
        setCrewName={setCrewName}
        crewGoal={crewGoal}
        setCrewGoal={setCrewGoal}
        place={place}
        setPlace={setPlace}
      />
      <CreateRightBar
        days={days}
        setDays={setDays}
        types={types}
        setTypes={setTypes}
        crewSize={crewSize}
        setCrewSize={setCrewSize}
        handleCreateCrew={handleCreateCrew} // 함수 전달
      />
    </main>
  );
}
