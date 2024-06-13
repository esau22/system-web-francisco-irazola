"use client";
import Link from "next/link";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

const MainMenu = () => {
  const router = useRouter();
  return (
    <ul className="flex flex-col lg:flex-row items-center gap-4">
      <li>
        <Link
          href="#home"
          className="py-2 px-4 border-b-2 border-primary transition-colors duration-300 text-white"
        >
          Inicio
        </Link>
      </li>
      <li>
        <Link
          href="#services"
          className="py-2 px-4 border-b-2 border-transparent hover:border-primary transition-colors duration-300 text-white"
        >
          Servicios
        </Link>
      </li>
      <li>
        <Link
          href="#about"
          className="py-2 px-4 border-b-2 border-transparent hover:border-primary transition-colors duration-300 text-white"
        >
          Acerca de
        </Link>
      </li>
      <li>
        <Link
          href="#contact"
          className="py-2 px-4 border-b-2 border-transparent hover:border-primary transition-colors duration-300 text-white"
        >
          Contacto
        </Link>
      </li>
      <li>
        <Button
          type="button"
          label="Login"
          onClick={() => router.push("/auth/login")}
        />
      </li>
    </ul>
  );
};

export default MainMenu;
