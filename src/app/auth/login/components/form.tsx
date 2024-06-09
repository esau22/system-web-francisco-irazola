"use client";
import Button from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { RiGoogleFill, RiFacebookFill, RiGithubFill } from "react-icons/ri";

const Form = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Aquí iría la lógica para enviar las credenciales al backend y realizar el inicio de sesión
      // Por simplicidad, asumiremos que se hace una solicitud POST al endpoint de inicio de sesión
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si el inicio de sesión es exitoso, obtenemos el token de sesión del backend
        const token = data.token; // Supongamos que el token está en la respuesta como 'token'

        // Almacenar el token en el almacenamiento local (localStorage)
        localStorage.setItem("authToken", token);
        setIsSuccess(true);
        setIsModalOpen(true);
        //router.push("/dashboard");
      } else {
        setError(data.message);
        setIsSuccess(false);
        setIsModalOpen(true);
        setEmail("");
        setPassword("");
        // Si hay un error en el inicio de sesión, muestra el mensaje de error
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión. Inténtalo de nuevo más tarde.");
      setIsSuccess(false);
      setIsModalOpen(true);
      setEmail("");
      setPassword("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Bienvenido!</h2>
        <p className="text-gray-500 text-sm">
          Por favor ingresa tu correo electrónico y contraseña para ingresar a
          la aplicación
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <div className="flex justify-end mb-5">
          <button
            type="button"
            onClick={() => router.push("/auth/forgot-password")}
            className="text-gray-500 hover:text-primary transition-colors duration-300"
          >
            Has olvidado tu Contraseña?
          </button>
        </div>
        <Button type="submit" label="Iniciar Sesion" />
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">Volver Pagina Principal?</p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="font-semibold hover:text-primary transition-colors duration-300"
          >
            Inicio
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        label={
          isSuccess
            ? "🎉 Inicio de sesión exitoso! 🎉"
            : "❌ Error de inicio de sesión ❌"
        }
        description={
          isSuccess
            ? "Has iniciado sesión correctamente."
            : "Credenciales incorrectas."
        }
        isSuccess={isSuccess} // Pasar el estado para distinguir entre éxito y error
      />
    </div>
  );
};

export default Form;
