import React from "react";
import Image from "next/image";
import { toast } from "sonner";

import { resizeImage } from "@/utils/resizing";

import { Input } from "@/components/ui/input";

interface ProfileImageUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ file, setFile }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // 파일이 이미지인지 확인
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 이미지 크기 줄이기
    const resizedFile = await resizeImage(selectedFile, 675, 675);
    setFile(resizedFile);
  };

  return (
    <div
      className="w-full justify-items-center flex flex-col gap-y-2 cursor-pointer"
      onClick={() => document.getElementById("crew_photo")?.click()} // input 파일 선택 트리거
    >
      <Input
        type="file"
        id="crew_photo"
        className="border-none cursor-pointer hidden"
        onChange={handleFileChange}
      />
      <div className="w-full flex flex-col justify-center items-center">
        <Image
          alt="대표 크루 이미지"
          width={280}
          height={280}
          className="object-cover rounded-md"
          src={file ? URL.createObjectURL(file) : "/images/image-picker-profile.png"}
        />
      </div>
    </div>
  );
};

export default ProfileImageUploader;
