"use client";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { data } from "./data";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const MenuItems = () => {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const canAccess = (route: any) => {
    if (!userRole) return false; // Si no hay rol definido, no mostrar ninguna ruta

    if (userRole === "Administrador") {
      return true; // El administrador puede acceder a todas las rutas
    } else if (userRole === "Empleado") {
      // El empleado solo puede acceder a /dashboard y /dashboard/tramite
      return route.href === "/dashboard" || route.href === "/dashboard/tramite";
    }

    return false; // En caso de otro rol o si no hay permiso para esta ruta
  };
  return (
    <ul>
      <li>
        {data.routes.map(
          (route) =>
            canAccess(route) && (
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
            )
        )}
      </li>
    </ul>
  );
};
