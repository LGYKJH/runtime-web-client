import React from "react";
import Image from "next/image";
import { resizeImage } from "@/utils/resizing";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ImageUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ file, setFile }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // 파일이 이미지인지 확인
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 이미지 크기 줄이기
    const resizedFile = await resizeImage(selectedFile, 1200, 675);
    setFile(resizedFile);
  };

  return (
    <div
      className="px-2 flex flex-col gap-y-2 cursor-pointer"
      onClick={() => document.getElementById("crew_photo")?.click()} // input 파일 선택 트리거
    >
      <Label htmlFor="crew_photo" className="cursor-pointer text-secondary font-normal">
        대표 크루 사진
      </Label>
      <Input
        type="file"
        id="crew_photo"
        className="border-none cursor-pointer hidden"
        onChange={handleFileChange}
      />
      <div className="flex flex-col justify-start items-start">
        <Image
          alt="대표 크루 이미지"
          width={240}
          height={128}
          className="object-cover rounded-md"
          src={file ? URL.createObjectURL(file) : "/images/image-picker-default.png"}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
