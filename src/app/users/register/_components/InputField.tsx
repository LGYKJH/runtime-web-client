import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  id,
  label,
  value,
  placeholder,
  error,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <Label className="hidden" htmlFor={id}>
        {id}
      </Label>
    </div>
  );
}
