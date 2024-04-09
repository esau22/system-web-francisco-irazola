import { cn } from "@/libs/utils";
import { FC } from "react";

interface ButtonProps {
  type: "button" | "submit";
  label: string;
  className?: string;
  onClick?: () => void;
}
const Button: FC<ButtonProps> = ({ type, label, className, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "w-full bg-primary text-while py-3 px-4 rounded-xl border-2 border-transparent hover:bg-transparent hover:border-primary hover:text-primary transition-color duration-30",
        className
      )}
    >
      {label}
    </button>
  );
};

export default Button;
