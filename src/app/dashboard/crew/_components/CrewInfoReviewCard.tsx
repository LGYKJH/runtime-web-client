import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import React from "react";

const CrewInfoReviewCard = () => {
  return (
    <div className="w-[120px] h-[120px] rounded-md overflow-hidden">
      <AspectRatio ratio={1 / 1}>
        <Image
          src="/image.png"
          alt="후기 이미지"
          className="object-cover"
          fill
        />
      </AspectRatio>
    </div>
  );
};

export default CrewInfoReviewCard;
