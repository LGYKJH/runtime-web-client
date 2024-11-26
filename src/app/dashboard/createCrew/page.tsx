"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/app/stores/userStore";

import CreateRightBar from "./_components/CreateRightBar";
import CreateCrewSection from "./_sections/CreateCrewSection";

export default function CreateCrewPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const [crewProfile, setCrewProfile] = useState<File | null>(null);
  const [crewName, setCrewName] = useState<string>("");
  const [crewGoal, setCrewGoal] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [days, setDays] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [crewSize, setCrewSize] = useState<number>();
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("00:00");

  const uploadCrewRegularPlan = async (
    crewId: string,
    days: string[],
    startTime: string,
    endTime: string,
    place: string
  ) => {
    try {
      // 오늘 날짜를 기준으로 한 달 동안 날짜 생성
      const generateCrewPlanDates = (days, time) => {
        const dayMapping = {
          일: 0,
          월: 1,
          화: 2,
          수: 3,
          목: 4,
          금: 5,
          토: 6,
        };

        const today = new Date();
        const crewPlanDates = [];

        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);

          const dayOfWeek = date.getDay(); // 반환 값: 0~6
          const selectedDay = Object.keys(dayMapping).find(
            (key) => dayMapping[key] === dayOfWeek
          );

          if (days.includes(selectedDay)) {
            const [hour, minute] = time.split(":");

            // 한국 시간으로 설정
            date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
            const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9로 변환

            // ISO 형식을 유지하되 T와 초 단위만 포함
            crewPlanDates.push(kstDate.toISOString().slice(0, 19));
          }
        }

        return crewPlanDates;
      };

      const startDates = generateCrewPlanDates(days, startTime);
      const endDates = generateCrewPlanDates(days, endTime);

      // 각 startDt와 endDt에 대해 API 요청
      const promises = startDates.map((startDate, index) =>
        fetch("/api/crew/plan/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            crewId,
            crewPlanContent: "정기모임",
            crewPlanStartDt: startDate,
            crewPlanEndDt: endDates[index],
            crewPlanStatus: 1,
            crewPlanSelectedDate: startDate.split("T")[0],
            crewPlanPlace: place,
            crewPlanIsRegular: 1,
          }),
        })
      );

      const responses = await Promise.all(promises);

      responses.forEach(async (response, index) => {
        if (response.ok) {
          const data = await response.json();
        } else {
          const error = await response.json();
          toast.error(`생성 실패: ${error.message}`);
        }
      });

      toast.success("모든 정기 크루 일정이 성공적으로 업로드되었습니다.");
    } catch (error) {
      toast.error("정기 일정 업로드 중 오류가 발생했습니다.");
    }
  };

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
      if (
        !crewName ||
        !crewGoal ||
        !place ||
        !crewSize ||
        !crewProfile ||
        !startTime ||
        !endTime
      ) {
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
        days,
        crewProfile: uploadedImageUrl,
        leaderId: user.userId,
      };

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

        const uploadCrewPlan = await uploadCrewRegularPlan(
          data,
          days,
          startTime,
          endTime,
          place
        );
        toast.success("크루가 성공적으로 생성되었습니다!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        const error = await response.json();
        toast.error(`생성 실패: ${error.message}`);
      }
    } catch (error) {
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
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        handleCreateCrew={handleCreateCrew}
      />
    </main>
  );
}
