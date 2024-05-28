import { IoMdAnalytics } from "react-icons/io";
import { PiUsersFill, PiUsersThreeFill } from "react-icons/pi";
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
      label: "Registro Usuarios",
      icon: PiUsersFill,
      href: "/dashboard/users",
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
