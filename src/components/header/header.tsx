import { cn } from "@/libs/utils";
import Input from "../ui/input";
import DropdownUser from "./dropdowm-user";

const Header = () => {
  return (
    <header className="sticky top-0 z-999 flex flex-col  bg-green-700 sm:flex-row items-center justify-between w-full px-2 py-3 border-b-4 border-gray-500/30">
      <div className="flex flex-grow items-center justify-between sm:w-auto gap-4">
        <Input
          type="text"
          placeholder="Buscar"
          className={cn(
            "w-25 -mb-5 ml-44 hidden md:hidden sm:hidden lg:inline-block flex-grow"
          )}
        />
        <div className="sm:ml-auto sm:order-2">
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
