import { FaRegUser } from "react-icons/fa";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";

export const data = {
  routes: [
    {
      label: "Perfil",
      icon: FaRegUser,
      href: "#",
    },
    {
      label: "Configuracion",
      icon: IoMdSettings,
      href: "#",
    },
    {
      label: "Cerrar Sesion",
      icon: IoMdLogOut,
      href: "/",
    },
  ],
};
