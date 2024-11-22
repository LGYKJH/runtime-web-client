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

  const uploadCrewImage = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}_${file.name}`;
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const base64 = reader.result?.toString().split(",")[1]; // Base64 인코딩
          const response = await fetch("/api/crew/uploadCrewImage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file: base64, fileName }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            reject(new Error(errorData.error));
          }

          const { url } = await response.json();
          resolve(url);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("파일 읽기 실패"));
      reader.readAsDataURL(file);
    });
  };

  const handleCreateCrew = async () => {
    try {
      if (!crewName || !crewGoal || !place || !crewSize || !crewProfile) {
        toast.warning("크루 생성에 필요한 정보를 모두 입력해주세요!");
        return;
      }

      // 이미지 업로드
      toast.info("이미지를 업로드 중입니다...");
      const uploadedImageUrl = await uploadCrewImage(crewProfile);

      // 크루 생성 요청 본문
      const requestBody = {
        crewName,
        types,
        crewSize,
        crewGoal,
        place,
        crewProfile: uploadedImageUrl, // 업로드된 이미지 URL 사용
      };

      console.log("전송 데이터:", requestBody);

      // 크루 생성 API 요청
      const response = await fetch("/api/crew/createCrew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("생성 성공:", data);
        toast.success("크루가 성공적으로 생성되었습니다!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
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

  const handleCreateAIDesc = async () => {
    try {
      if (!crewName || !place || !crewSize || !crewProfile) {
        toast.warning("AI 소개 작성에 필요한 정보를 모두 입력해주세요!");
        return;
      }

      const requestBody = {
        crewName,
        place,
        days,
        types,
        crewSize,
      };

      const response = await fetch("/api/crew/createAIDesc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("생성 성공:", data);
        toast.success("성공적으로 AI 크루 소개가 생성되었습니다.");
        setCrewGoal(data.post);
      } else {
        const error = await response.json();
        toast.error(`생성 실패: ${error.message}`);
      }
    } catch (error) {
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
        handleCreateAIDesc={handleCreateAIDesc}
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
