"use client";
import Header from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import ButtonIcon from "@/components/ui/button-icon";
import { cn } from "@/libs/utils";
import { FC, ReactNode, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <section className={cn("text-gray-300")}>
      <Sidebar showMenu={showMenu} onClose={() => setShowMenu(false)} />
      <ButtonIcon
        icon={RiMenu2Line}
        onClick={() => setShowMenu(true)}
        className="lg:hidden fixed right-0 bottom-0 z-30 bg-white p-4 rounded-tl-lg"
      />
      <Header />
      <main className="lg:pl-[24vw] xl:pl-[13vw] px-5 xl:px-0 container mx-auto py-5 lg:py-8">
        {children}
      </main>
    </section>
  );
};

export default DashboardLayout;
