import { PiUsersFill } from "react-icons/pi";
import { RiHome3Line, RiTableAltFill } from "react-icons/ri";

export const data = {
  routes: [
    {
      label: "Bienvenidos",
      icon: RiHome3Line,
      href: "/dashboard",
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
  ],
};
