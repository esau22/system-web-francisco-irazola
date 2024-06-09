"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { isValidEmail } from "@/utils/isValidEmail";
import Modal from "./modal";
import Select from "./select";

const Form = () => {
  const [usuario, setUsuario] = useState({
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "Administrador",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

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
      setIsSuccess(false);
      setIsModalOpen(true);
      return;
    }

    if (!isValidEmail(email)) {
      setErrors(["Email no válido"]);
      setIsSuccess(false);
      setIsModalOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrors(["La contraseña y la confirmación no coinciden"]);
      setIsSuccess(false);
      setIsModalOpen(true);
      return;
    }

    try {
      //console.log("Datos del usuario:", usuario);
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        const data = await response.json();
        //console.log("Usuario creado:", data.user);
        //router.push("/dashboard");
        setIsSuccess(true);
        setIsModalOpen(true);
      } else {
        const data = await response.json();
        //console.log("---->", data);
        setErrors([data.message]);
        setIsSuccess(false);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setErrors(["Error al crear usuario"]);
      setIsSuccess(true);
      setIsModalOpen(true);
    }
    if (!isSuccess) {
      ResetUser();
    }
  };

  const ResetUser = () => {
    setUsuario((prevState) => ({
      ...prevState,
      user: "",
      email: "",
      password: "",
      confirmPassword: "",
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (!isSuccess || isSuccess) {
      ResetUser();
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-gray-300 dark:text-gray-300">
          Registrar Usuario
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          value={usuario.user}
          type="text"
          name="user"
          onChange={handleChange}
          placeholder="Ingrese Usuario"
          className="text-gray-500"
        />
        <Input
          value={usuario.email}
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Ingrese Email"
          className="text-gray-500"
        />
        <Input
          value={usuario.password}
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Ingrese Passwoard"
          className="text-gray-500"
        />
        <Input
          value={usuario.confirmPassword}
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Confirme Passwoard"
          className="text-gray-500"
        />

        <Select
          className="text-gray-600"
          value={usuario.rol ?? ""}
          name="rol"
          onChange={handleChange}
          options={[
            { label: "Administrador", value: "Administrador" },
            { label: "Empleado", value: "Empleado" },
          ]}
        />
        <Button type="submit" label="Crear Usuario" />

        {/*<div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
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
        </div>*/}
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        label={
          isSuccess
            ? "Usuario Registrado exitosamente!"
            : "❌ Error al registrar usuario ❌"
        }
        description={
          isSuccess
            ? "El Usuario ha sido registrado correctamente."
            : errors.length > 0
            ? errors.join(", ")
            : "Error desconocido."
        }
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default Form;
