import { FC } from "react";

interface ButtonProps {
  type: "button" | "submit";
  label: string;
}
const Button: FC<ButtonProps> = ({ type, label }) => {
  return (
    <button
      type={type}
      className="w-full bg-primary text-while py-3 px-4 rounded-xl border-2 border-transparent
           hover:bg-transparent hover:border-primary hover:text-primary transition-color duration-30"
    >
      {label}
    </button>
  );
};

export default Button;
