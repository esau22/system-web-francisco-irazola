"use client";
import { FC } from "react";
import { cn } from "@/libs/utils";

interface Option {
  label: string;
  value: any;
}
interface SelectProps {
  name?: string;
  onChange?: any;
  className?: string;
  value?: any;
  options: Option[];
  placeholder?: string;
}

const Select: FC<SelectProps> = ({
  className,
  name,
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div className="w-full relative mb-5">
      <select
        className={cn(
          "bg-gray-100 w-full py-3 pl-4 pr-12 outline-none rounded-xl text-gray-600",
          className
        )}
        name={name}
        value={value}
        onChange={onChange}
      >
        {/* Placeholder como primera opción */}
        {placeholder && <option value="">{placeholder}</option>}

        {/* Mapear las opciones */}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
