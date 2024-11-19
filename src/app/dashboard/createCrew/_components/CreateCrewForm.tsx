import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import NaverMap from "../../_components/NaverMap";
import Map from "./Map";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// 지역 이름 타입
type Districts =
  | "강남구"
  | "강서구"
  | "강북구"
  | "강동구"
  | "관악구"
  | "노원구"
  | "마포구"
  | "서초구"
  | "송파구"
  | "영등포구"
  | "은평구"
  | "종로구";

const districts: Districts[] = [
  "강남구",
  "강서구",
  "강북구",
  "강동구",
  "관악구",
  "노원구",
  "마포구",
  "서초구",
  "송파구",
  "영등포구",
  "은평구",
  "종로구",
];

const CreateCrewForm = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-y-4 pl-10 pr-10 py-7 flex-1 h-full">
      <div className="w-full flex flex-row justify-between items-center px-2 pt-1 pb-4">
        <h4 className="font-semibold">새 크루 만들기</h4>
      </div>
      <div className="w-full h-full flex-1 flex flex-row justify-start items-start gap-x-6">
        <div className="flex flex-col justify-start items-start gap-y-4">
          <div className="px-2 flex flex-col gap-y-2">
            <Label
              htmlFor="photo"
              className="cursor-pointer text-secondary font-normal"
            >
              대표 크루 사진
            </Label>
            <Input
              type="file"
              id="photo"
              className="border-none cursor-pointer hidden"
            />
            <div className="w-full flex-1 flex flex-col justify-start items-start border rounded-md">
              <img
                alt="이미지"
                className="w-[240px] h-[128px] object-cover"
                src="https://placehold.co/240x128"
              />
            </div>
          </div>
          <div className="px-2 flex flex-col gap-y-2">
            <Label htmlFor="place" className="text-secondary font-normal">
              러닝 장소
            </Label>
            <Map id="place" />
            <Input type="text" placeholder="지역구" />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">검색</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>지역구 선택</DialogTitle>
                  <DialogDescription>
                    런닝 크루가 모일 주요 지역을 선택해주세요!
                  </DialogDescription>
                </DialogHeader>
                <div className="pt-2 flex flex-row flex-wrap justify-start items-center gap-x-2 gap-y-2">
                  {districts.map((district) => (
                    <Button
                      key={district}
                      variant="ghost"
                      size="sm"
                      className="px-2.5 h-7 font-normal hover:bg-[#193fff] focus:bg-[#193fff] hover:text-white focus:text-white leading-normal rounded-full"
                    >
                      {district}
                    </Button>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="outline">확인</Button>
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
              placeholder=""
              className="font-medium text-primary w-full"
            />
          </div>
          <div className="w-full flex-1 flex flex-col gap-y-2">
            <Label htmlFor="goal" className="text-secondary font-normal">
              크루 목표
            </Label>
            <Textarea
              placeholder="크루 목표를 적어주세요..."
              id="goal"
              className="w-full flex-1 h-full resize-none md:text-sm text-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCrewForm;
