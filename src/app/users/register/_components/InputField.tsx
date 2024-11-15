import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputFieldProps = {
  id: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  id,
  value,
  placeholder,
  error,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col space-y-1.5">
      <span className="text-red-500 text-sm min-h-[1.5em]">{error || " "}</span>
      <Label className="hidden" htmlFor={id}>
        {id}
      </Label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
