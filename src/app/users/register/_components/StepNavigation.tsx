import React from "react";
import { Button } from "@/components/ui/button";

type StepNavigationProps = {
  step: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export default function StepNavigation({
  step,
  totalSteps,
  onPrev,
  onNext,
  onSubmit,
  isSubmitting,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between">
      {step > 0 && (
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          disabled={isSubmitting} // 제출 중 비활성화
        >
          이전
        </Button>
      )}
      {step < totalSteps - 1 ? (
        <Button
          type="button"
          onClick={onNext}
          className="ml-auto"
          disabled={isSubmitting} // 제출 중 비활성화
        >
          다음
        </Button>
      ) : (
        <Button
        type="button"
        onClick={onSubmit}
        className="ml-auto"
        disabled={isSubmitting} // 제출 중 비활성화
      >
        제출
      </Button>
      )}
    </div>
  );
}
