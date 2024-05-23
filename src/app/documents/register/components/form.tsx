"use client";
import Button from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { isValidEmail } from "@/utils/isValidEmail";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RiFacebookFill, RiGithubFill, RiGoogleFill } from "react-icons/ri";

interface Tipo {
  id: number;
  nombre: string;
}

interface Area {
  id: number;
  nombre: string;
}

const Form = () => {
  const router = useRouter();
  const [documento, setDocumento] = useState({
    remitente: "",
    email: "",
    asunto: "",
    fecha: "",
    informacion: null as File | null,
    tipo: null as number | null,
    area: null as number | null,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await fetch("/api/tipo_document");
        const data = await response.json();
        setTipos(data.tipos);
      } catch (error) {
        console.error("Error al obtener tipos:", error);
      }
    };

    fetchTipos();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("/api/area");
        const data = await response.json();
        setAreas(data.areas);
      } catch (error) {
        console.error("Error al obtener áreas:", error);
      }
    };

    fetchAreas();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "informacion" &&
      e.target instanceof HTMLInputElement &&
      e.target.type === "file"
    ) {
      const file = e.target.files && e.target.files[0];
      if (file) {
        setDocumento((prevDocument) => ({
          ...prevDocument,
          informacion: file,
        }));
      }
    } else {
      setDocumento((prevDocument) => ({
        ...prevDocument,
        [name]:
          name === "tipo" || name === "area" ? parseInt(value, 10) : value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    const { remitente, email, asunto, fecha, informacion, tipo, area } =
      documento;

    if (
      !remitente ||
      !email ||
      !asunto ||
      !fecha ||
      !informacion ||
      !tipo ||
      !area
    ) {
      setErrors(["Todos los campos son obligatorios"]);
      return;
    }

    if (!isValidEmail(email)) {
      setErrors(["Email no válido"]);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          const fileContent = event.target.result as ArrayBuffer;
          const fileData = Array.from(new Uint8Array(fileContent));

          const requestData = {
            remitente,
            email,
            asunto,
            fecha,
            informacion: {
              type: "Buffer",
              data: fileData,
            },
            tipo,
            area,
          };

          console.log("Datos del requestData:", requestData);

          const response = await fetch("/api/documents", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log("Documento creado exitosamente:", responseData);
            router.push("/");
          } else {
            const errorData = await response.json();
            console.error(
              "Error en la respuesta del servidor:",
              errorData.message
            );
            setErrors([errorData.message]);
          }
        }
      };
      reader.readAsArrayBuffer(informacion);
    } catch (error: any) {
      console.error("Error al enviar el formulario:", error);
      setErrors([error.message]);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Registrar Documento</h2>
        <p className="text-gray-500 text-sm">Rellene los Datos Necesarios</p>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <Input
          value={documento.remitente}
          type="text"
          name="remitente"
          onChange={handleChange}
          placeholder="Ingrese Remitente"
        />
        <Input
          value={documento.email}
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Ingrese Email"
        />
        <Input
          value={documento.asunto}
          type="text"
          name="asunto"
          onChange={handleChange}
          placeholder="Ingrese Asunto"
        />
        <Input
          value={documento.fecha}
          type="date"
          name="fecha"
          onChange={handleChange}
          placeholder="Ingrese Fecha"
        />
        <Input
          //value={documento.informacion}
          type="file"
          name="informacion"
          onChange={handleChange}
          placeholder="Ingrese Informacion"
        />
        <Select
          value={documento.area}
          onChange={handleChange}
          name="area"
          options={
            areas
              ? areas.map((area) => ({ label: area.nombre, value: area.id }))
              : []
          }
        />
        <Select
          value={documento.tipo}
          onChange={handleChange}
          name="tipo"
          options={
            tipos
              ? tipos.map((tipo) => ({ label: tipo.nombre, value: tipo.id }))
              : []
          }
        />

        <Button type="submit" label="Enviar Documento" />

        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">have account?</p>*{" "}
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