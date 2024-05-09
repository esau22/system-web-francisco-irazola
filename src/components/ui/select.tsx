"use client";
import { FC } from "react";
import { cn } from "@/libs/utils";

interface Option {
  label: string;
  value: number;
}
interface SelectProps {
  name?: string;
  onChange?: any;
  className?: string;
  value?: any;
  options: Option[];
}

const Select: FC<SelectProps> = ({
  className,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="w-full relative mb-5">
      <select
        className={cn(
          "bg-gray-100 w-full py-3 pl-4 pr-12 outline-none rounded-xl",
          className
        )}
        name={name}
        value={value}
        onChange={onChange}
      >
        {/* Mapear las opciones */}
        {options &&
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
