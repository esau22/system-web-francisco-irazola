"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { RiGoogleFill, RiFacebookFill, RiGithubFill } from "react-icons/ri";
import { isValidEmail } from "@/utils/isValidEmail";

const Form = () => {
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const { user, email, password, confirmPassword, rol } = usuario;

    if (!user || !email || !password || !confirmPassword || !rol) {
      setErrors(["Todos los campos son obligatorios"]);
      return;
    }

    if (!isValidEmail(email)) {
      setErrors(["Email no válido"]);
      return;
    }

    if (password !== confirmPassword) {
      setErrors(["La contraseña y la confirmación no coinciden"]);
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Usuario creado:", data.user);
        router.push("/auth/login");
      } else {
        const data = await response.json();
        setErrors([data.message]);
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setErrors(["Error al crear usuario"]);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Registrar</h2>
        <p className="text-gray-500 text-sm">
          Please enter your email and password to enter the application
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          value={usuario.user}
          type="text"
          name="user"
          onChange={handleChange}
          placeholder="Ingrese Usuario"
        />
        <Input
          value={usuario.email}
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Ingrese Email"
        />
        <Input
          value={usuario.password}
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Ingrese Passwoard"
        />
        <Input
          value={usuario.confirmPassword}
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Ingrese Passwoard"
        />
        <Input
          value={usuario.rol}
          type="text"
          name="rol"
          onChange={handleChange}
          placeholder="Ingrese Rol"
        />
        <Button type="submit" label="Create account" />

        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">have account?</p>
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="font-semibold hover:text-primary transition-colors duration-300"
          >
            Login
          </button>
        </div>
        <div className="mb-5">
          <hr className="border-2" />
          <div className="flex justify-center">
            <span className="bg-white px-8 -mt-3">or</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <ButtonIcon icon={RiGoogleFill} />
          <ButtonIcon icon={RiFacebookFill} />
          <ButtonIcon icon={RiGithubFill} />
        </div>
      </form>
    </div>
  );
};

export default Form;
