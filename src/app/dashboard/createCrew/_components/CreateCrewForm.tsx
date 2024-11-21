import React, { useState, Dispatch, SetStateAction, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Map from "./Map";
import { Districts, districts, districtCoordinates } from "@/lib/districts";
import Image from "next/image";

interface CreateCrewFormProps {
  crewName: string;
  setCrewName: Dispatch<SetStateAction<string>>;
  crewGoal: string;
  setCrewGoal: Dispatch<SetStateAction<string>>;
  crewProfile: File | null;
  setCrewProfile: Dispatch<SetStateAction<File | null>>;
  place: string;
  setPlace: Dispatch<SetStateAction<string>>;
}

const CreateCrewForm = ({
  crewName,
  setCrewName,
  crewGoal,
  setCrewGoal,
  crewProfile,
  setCrewProfile,
  place,
  setPlace,
}: CreateCrewFormProps) => {
  const [selectedDistrict, setSelectedDistrict] = useState<Districts | "">("");

  const handleDistrictSelect = useCallback(
    (district: Districts) => {
      setSelectedDistrict(district);
      setPlace(district);
    },
    [setPlace]
  );

  const handlePlaceChange = () => {
    if (selectedDistrict) {
      setPlace(selectedDistrict);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrewName(e.target.value);
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCrewGoal(e.target.value);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCrewProfile(file || null);
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-y-4 pl-10 pr-10 py-7 flex-1 h-full">
      <div className="w-full flex flex-row justify-between items-center px-2 pt-1 pb-4">
        <h4 className="font-semibold">새 크루 만들기</h4>
      </div>
      <div className="w-full h-full flex-1 flex flex-row justify-start items-start gap-x-6">
        <div className="flex flex-col justify-start items-start gap-y-4">
          <div
            className="px-2 flex flex-col gap-y-2 cursor-pointer" // 커서 포인터 추가
            onClick={() => document.getElementById("crew_photo")?.click()} // input 파일 선택 트리거
          >
            <Label htmlFor="crew_photo" className="cursor-pointer text-secondary font-normal">
              대표 크루 사진
            </Label>
            <Input
              type="file"
              id="crew_photo"
              className="border-none cursor-pointer hidden"
              onChange={handlePhotoChange}
            />
            <div className="flex flex-col justify-start items-start">
              <Image
                alt="이미지"
                width={240}
                height={128}
                className="object-cover rounded-md"
                src={
                  crewProfile
                    ? URL.createObjectURL(crewProfile)
                    : "/images/image-picker-default.png"
                }
              />
            </div>
          </div>

          <div className="px-2 flex flex-col gap-y-2">
            <Label htmlFor="place" className="text-secondary font-normal">
              러닝 장소
            </Label>
            <Map markerPosition={place ? districtCoordinates[place as Districts] : undefined} />
            <Dialog>
              <DialogTrigger asChild>
                <div className="mt-2 w-full flex flex-col justify-items-start gap-y-2">
                  <Input type="text" value={place || ""} readOnly placeholder="지역구 선택" />
                  <Button variant="outline">검색</Button>
                </div>
              </DialogTrigger>
              <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                  <DialogTitle>지역구 선택</DialogTitle>
                  <DialogDescription>런닝 크루가 모일 주요 지역을 선택해주세요!</DialogDescription>
                </DialogHeader>
                <div className="pt-2 flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2">
                  {districts.map((district) => (
                    <Button
                      key={district}
                      variant="ghost"
                      size="sm"
                      className={`px-2.5 h-7 font-normal hover:bg-pointColor focus:bg-pointColor hover:text-white focus:text-white leading-normal rounded-full ${
                        place === district ? "bg-pointColor text-white" : ""
                      }`}
                      onClick={() => handleDistrictSelect(district)}
                    >
                      {district}
                    </Button>
                  ))}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" onClick={handlePlaceChange}>
                      확인
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="w-full h-full flex-1 flex flex-col justify-start items-start gap-y-4 px-2">
          <div className="w-full flex flex-col gap-y-2">
            <Label htmlFor="name" className="text-secondary font-normal">
              크루 이름
            </Label>
            <Input
              id="name"
              type="text"
              value={crewName}
              onChange={handleNameChange}
              placeholder="크루 이름 입력"
              className="font-medium text-primary w-full"
            />
          </div>
          <div className="w-full flex-1 flex flex-col gap-y-2">
            <Label htmlFor="goal" className="text-secondary font-normal">
              크루 소개
            </Label>
            <Textarea
              placeholder="크루 소개를 적어주세요..."
              id="goal"
              value={crewGoal}
              onChange={handleGoalChange}
              className="w-full flex-1 h-full resize-none md:text-sm text-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCrewForm;
