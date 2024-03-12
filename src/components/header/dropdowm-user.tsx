import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { data } from "./data";
import { cn } from "@/libs/utils";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-1"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            className="rounded-full"
            width={112}
            height={112}
            src={"/sadmanshakib.jpg"}
            alt="User"
          />
        </span>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-5 mt-5 flex w-62.5 flex-col rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 px-6 py-7.5">
          <li>
            {data.routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium duration-300 ease-in-out hover:text-gray-500 lg:text-base"
                )}
              >
                <route.icon size={18} />
                {route.label}
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownUser;
