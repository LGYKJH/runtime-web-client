import React from "react";
import { Button } from "@/components/ui/button";

type StepNavigationProps = {
  step: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export default function StepNavigation({
  step,
  totalSteps,
  onPrev,
  onNext,
  onSubmit,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between">
      {step > 0 && (
        <Button type="button" onClick={onPrev} variant="outline">
          이전
        </Button>
      )}
      {step < totalSteps - 1 ? (
        <Button type="button" onClick={onNext} className="ml-auto">
          다음
        </Button>
      ) : (
        <Button type="button" onClick={onSubmit} className="ml-auto">
          제출
        </Button>
      )}
    </div>
  );
}
