import { cn } from "@/libs/utils";
import Link from "next/link";
import { data } from "./data";
import { usePathname } from "next/navigation";

export const MenuItems = () => {
  const pathname = usePathname();
  return (
    <ul>
      <li>
        {data.routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-4 text-gray-500 py-[1.57rem] px-2 border-b border-gray-500/30 hover:bg-gray-500/5 hover:text-white transition-colors duration-300",
              pathname === route.href && "bg-blue-600 text-white"
            )}
          >
            <route.icon size={18} />
            {route.label}
          </Link>
        ))}
      </li>
    </ul>
  );
};
