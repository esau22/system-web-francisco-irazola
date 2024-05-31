"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { data } from "./data";
import { cn } from "@/libs/utils";
//import router from "next/router";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const handleLogout = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/login", { method: "DELETE" });
      console.log("Delete request sent:", response); // Agregar este log
      if (response.ok) {
        console.log("Sesión cerrada exitosamente");
        // Eliminar la cookie de autenticación
        document.cookie =
          "auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC; HttpOnly; SameSite=Lax";
        // Eliminar el token de sesión del almacenamiento local
        localStorage.removeItem("authToken");
        // Redirigir al usuario a la ruta de inicio de sesión
        //router.push("/");
        window.location.href = "/";
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
      handleLogout;
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
      handleLogout;
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-1"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            className="rounded-full object-fill"
            width={112}
            height={112}
            src={"/sadmanshakib.jpg"}
            alt="User"
          />
        </span>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-5 mt-5 flex w-62.5 flex-col rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="absolute right-6 w-40 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700">
          {data.routes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                onClick={
                  route.label === "Cerrar Sesion" ? handleLogout : undefined
                }
                className={cn(
                  "flex items-center gap-1 text-sm font-medium duration-300 ease-in-out hover:text-gray-500 lg:text-base"
                )}
              >
                <route.icon size={18} />
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownUser;
