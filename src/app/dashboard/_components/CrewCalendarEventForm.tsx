"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CrewCalendarEventFormProps {
  selectedDate: Date;
  crewId: number; // 추가된 crewId
  onSubmit: () => void;
  onCancel: () => void;
}

function CrewCalendarEventForm({ selectedDate, crewId, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    category: "",
    place: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //////// 한국 시간으로 바꾸기
  const formatToKoreanDateTime = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":").map(Number);

    // 한국 시간대로 변환
    const koreanDate = new Date(date.getTime());
    koreanDate.setHours(hours, minutes, 0, 0); // 설정된 시간으로 업데이트
    koreanDate.setTime(koreanDate.getTime() + 9 * 60 * 60 * 1000); // UTC+9 적용

    // "yyyy-MM-dd'T'HH:mm:ss" 형식으로 반환
    return koreanDate.toISOString().split(".")[0]; // 밀리초 제거
  };
  ///////////

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.place || !formData.startTime) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      const crewPlanData = {
        crewId,
        crewPlanContent: formData.category,
        crewPlanStartDt: formatToKoreanDateTime(
          selectedDate,
          formData.startTime
        ),
        crewPlanEndDt: formData.endTime
          ? formatToKoreanDateTime(selectedDate, formData.endTime)
          : null,
        crewPlanSelectedDate: selectedDate.toISOString().split("T")[0],
        crewPlanPlace: formData.place,
        crewPlanIsRegular: formData.category === "정기모임" ? 1 : 0,
      };

      const response = await fetch("/api/crew/plan/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crewPlanData),
      });

      if (response.ok) {
        alert("이벤트가 성공적으로 추가되었습니다!");
        onSubmit(); // 성공 시 추가 동작
      } else {
        const errorData = await response.json();
        alert(`에러: ${errorData.message}`);
      }
    } catch (error) {
      alert("이벤트 추가 중 문제가 발생했습니다.");
    }
  };

  return (
    <Card className="mt-4 shadow">
      <CardHeader>
        <CardTitle className="text-sm">
          {selectedDate.toDateString()} 일정 등록하기
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">카테고리</label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger className="w-full">
                {/* SelectValue를 사용하여 선택된 값 표시 */}
                <SelectValue placeholder="선택하기" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="정기모임">정기모임</SelectItem>
                <SelectItem value="번개모임">번개모임</SelectItem>
                <SelectItem value="회식">회식</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Place */}
          <div>
            <label className="block text-sm font-medium mb-1">장소</label>
            <Input
              type="text"
              placeholder="장소를 입력하세요"
              value={formData.place}
              onChange={(e) => handleChange("place", e.target.value)}
            />
          </div>

          {/* Date Picker (시작 시간) */}
          <div>
            <label className="block text-sm font-medium mb-1">시작 시간</label>
            <Input
              type="time"
              value={formData.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
            />
          </div>

          {/* Date Picker (종료 시간) */}
          <div>
            <label className="block text-sm font-medium mb-1">종료 시간</label>
            <Input
              type="time"
              value={formData.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="ghost" onClick={onCancel}>
              취소
            </Button>
            <Button type="submit">등록하기</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export { CrewCalendarEventForm };
