import { AiFillSetting } from "react-icons/ai";
import { IoMdAnalytics } from "react-icons/io";
import {
  RiCalendarCheckFill,
  RiHome3Line,
  RiProfileFill,
  RiTableAltFill,
  RiUserLine,
} from "react-icons/ri";

export const data = {
  routes: [
    {
      label: "Home",
      icon: RiHome3Line,
      href: "/dashboard/matricula",
    },
    {
      label: "Calender",
      icon: RiCalendarCheckFill,
      href: "/dashboard/certificado",
    },
    {
      label: "Tables",
      icon: RiTableAltFill,
      href: "/tables",
    },
    {
      label: "Settings",
      icon: AiFillSetting,
      href: "/settings",
    },
    {
      label: "Profile",
      icon: RiProfileFill,
      href: "/profile",
    },
    {
      label: "UI",
      icon: IoMdAnalytics,
      href: "/ui",
    },
    {
      label: "Auth",
      icon: RiUserLine,
      href: "/auth",
    },
  ],
};
