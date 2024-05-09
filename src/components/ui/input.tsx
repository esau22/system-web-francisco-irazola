"use client";
import { FC, useState } from "react";
import { cn } from "@/libs/utils";
import { RiLockLine, RiLockUnlockLine } from "react-icons/ri";

interface InputProps {
  type: "text" | "email" | "password" | "date" | "file";
  placeholder: string;
  name?: string;
  onChange?: any;
  className?: string;
  value?: string;
}

const Input: FC<InputProps> = ({
  type,
  className,
  placeholder,
  name,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full relative mb-5">
      <input
        type={
          type === "text"
            ? "text"
            : type === "email"
            ? "email"
            : type === "date"
            ? "date"
            : type === "file"
            ? "file"
            : showPassword
            ? "text"
            : "password"
        }
        className={cn(
          "bg-gray-100 w-full py-3 pl-4 pr-12 outline-none rounded-xl",
          className
        )}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <RiLockUnlockLine /> : <RiLockLine />}
        </button>
      )}
    </div>
  );
};

export default Input;
