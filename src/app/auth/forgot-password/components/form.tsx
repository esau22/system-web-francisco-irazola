"use client";

import Button from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { RiGoogleFill, RiFacebookFill, RiGithubFill } from "react-icons/ri";

const Form = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Has olvidado tu contraseña?</h2>
        <p className="text-gray-500 text-sm">
          Por favor ingresa tu correo electrónico para Recuperar tu cuenta
        </p>
      </div>
      <form className="w-full">
        <Input type="text" placeholder="Email" />
        <Button type="submit" label="Enviar" />
        <div className="mt-5 mb-5 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">Tienes cuenta?</p>
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="font-semibold hover:text-primary transition-colors duration-300"
          >
            Iniciar Sesion
          </button>
        </div>
        {/*<div className="flex items-center justify-center gap-x-2">
          <p className="text-gray-500">dont have account?</p>
          <button
            type="button"
            onClick={() => router.push("/auth/register")}
            className="font-semibold hover:text-primary transition-colors duration-300"
          >
            Register
          </button>
  </div>*/}
      </form>
    </div>
  );
};

export default Form;
