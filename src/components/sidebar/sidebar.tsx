"use client";
import { cn } from "@/libs/utils";
import { MenuItems } from "./menu-items";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  showMenu: boolean;
  onClose: () => void;
}

export const Sidebar = ({ showMenu, onClose }: SidebarProps) => {
  return (
    <>
      <aside
        className={cn(
          "fixed top-0 lg:left-0 bg-black w-[50vw] md:w-[20vw] lg:w-[15vw] xl:w-[13vw] h-full border-r border-gray-500/30 transition-all duration-300 ease-in-out z-50",
          showMenu ? "left-0" : "-left-full"
        )}
      >
        <section className="relative flex flex-col items-center px-2 py-[1.57rem] border-b border-gray-500/30 h-[6.8vw]">
          <Link
            href="/"
            className="relative flex gap-2 text-xl text-gray-500 hover:text-white transition-colors duration-300"
          >
            <Image
              className="h-14 w-14 rounded-md items-center"
              width={400}
              height={400}
              src={"/images/logo/logo_fi.png"}
              alt="Logo"
            />
          </Link>
        </section>
        <section>
          <MenuItems />
        </section>
      </aside>
      <div
        onClick={onClose}
        className={cn(
          "fixed bg-black/10 z-40 left-0 top-0 w-full h-full lg:hidden",
          showMenu ? "block" : "hidden"
        )}
      ></div>
    </>
  );
};
