import { cn } from "@/libs/utils";
import { FC } from "react";
import { IconType } from "react-icons";

interface ButtonIconProps {
  icon: IconType;
  onClick?: () => void;
  className?: string;
}
const ButtonIcon: FC<ButtonIconProps> = ({
  icon: Icon,
  className,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cn(
        "p-4 bg-gary-100 rounded-xl text-primary border-2 border-transparent hover:border-primary transition-colors duration-300",
        className
      )}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default ButtonIcon;
