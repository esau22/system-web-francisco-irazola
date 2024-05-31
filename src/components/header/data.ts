import { FaRegUser } from "react-icons/fa";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";

export const data = {
  routes: [
    {
      label: "Perfil",
      icon: FaRegUser,
      href: "/dashboard/perfil",
    },
    {
      label: "Configuracion",
      icon: IoMdSettings,
      href: "/dashboard/setting",
    },
    {
      label: "Cerrar Sesion",
      icon: IoMdLogOut,
      href: "/",
    },
  ],
};
