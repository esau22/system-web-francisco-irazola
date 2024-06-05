import { PiUsersFill } from "react-icons/pi";
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
      label: "Registro de Usuarios",
      icon: PiUsersFill,
      href: "/dashboard/users",
    },
    {
      label: "Auth",
      icon: RiUserLine,
      href: "/auth",
    },
  ],
};
