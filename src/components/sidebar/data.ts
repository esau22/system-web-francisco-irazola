import { AiFillSetting } from "react-icons/ai";
import { IoMdAnalytics } from "react-icons/io";
import { PiUsersThreeFill } from "react-icons/pi";
import {
  RiCalendarCheckFill,
  RiHome3Line,
  RiTableAltFill,
  RiUserLine,
} from "react-icons/ri";

export const data = {
  routes: [
    {
      label: "Matricula",
      icon: RiHome3Line,
      href: "/dashboard/matricula",
    },
    {
      label: "Certificado de Estudios",
      icon: RiCalendarCheckFill,
      href: "/dashboard/certificado",
    },
    {
      label: "Tramite de Documentos",
      icon: RiTableAltFill,
      href: "/dashboard/tramite",
    },
    {
      label: "Registrar Usuario",
      icon: PiUsersThreeFill,
      href: "/dashboard/register",
    },
    {
      label: "Settings",
      icon: AiFillSetting,
      href: "/settings",
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
