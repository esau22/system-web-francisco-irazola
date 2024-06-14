"use client";
import Button from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import Input from "@/components/ui/input";
import ModalTiket from "@/components/ui/modal-tiket";
import Select from "@/components/ui/select";
import { isValidEmail } from "@/utils/isValidEmail";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RiFacebookFill, RiGithubFill, RiGoogleFill } from "react-icons/ri";

interface Documento {
  id?: number; // id es opcional si aún no se conoce al inicio
  remitente: string;
  email: string;
  asunto: string;
  fecha: string;
  informacion: File | null;
  tipo: number | null;
  area: number | null;
}
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
  const [documento, setDocumento] = useState<Documento>({
    remitente: "",
    email: "",
    asunto: "",
    fecha: "",
    informacion: null as File | null,
    tipo: null as number | null,
    area: null as number | null,
  });

  const [errors, setErrors] = useState(false);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState({ tipos: true, areas: true });
  const [isModalTiketOpen, setIsModalTiketOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await fetch("/api/tipo_document");
        const data = await response.json();
        setTipos(data.tipos);
        // Establecer el primer tipo como valor por defecto
        if (data.tipos.length > 0) {
          setDocumento((prevDocument) => ({
            ...prevDocument,
            tipo: data.tipos[0].id,
          }));
        }
      } catch (error) {
        console.error("Error al obtener tipos:", error);
      } finally {
        setLoading((prev) => ({ ...prev, tipos: false }));
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
        // Establecer la primera área como valor por defecto
        if (data.areas.length > 0) {
          setDocumento((prevDocument) => ({
            ...prevDocument,
            area: data.areas[0].id,
          }));
        }
      } catch (error) {
        console.error("Error al obtener áreas:", error);
      } finally {
        setLoading((prev) => ({ ...prev, areas: false }));
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
    //setErrors([]);
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
      setErrors(true);
      return;
    }
    setErrors(false);
    //let errors = {};
    if (!isValidEmail(email)) {
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
            const { document } = responseData; // Obtener el documento creado
            const { id } = document; // Obtener el ID del documento creado

            setIsSuccess(true);
            setDocumento((prevDocument) => ({
              ...prevDocument,
              id: id, // Actualiza el estado de documento con el ID
            }));
            setIsModalTiketOpen(true);
          } else {
            const errorData = await response.json();
            console.error(
              "Error en la respuesta del servidor:",
              errorData.message
            );
            setIsSuccess(false);
            setIsModalTiketOpen(true);
            // setIsModalTiketOpen(true);
          }
        }
      };
      reader.readAsArrayBuffer(informacion);
    } catch (error: any) {
      console.error("Error al enviar el formulario:", error);
      setIsSuccess(false);
      setIsModalTiketOpen(true);
      //setIsModalTiketOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalTiketOpen(false);
    if (isSuccess) {
      router.push("/");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Registrar Documento </h2>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <Input
          value={documento.remitente}
          type="text"
          name="remitente"
          onChange={handleChange}
          placeholder="Ingrese nombres y apellidos"
        />
        <Input
          value={documento.email}
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Ingrese su correo"
        />
        <Select
          value={documento.asunto ?? ""}
          name="asunto"
          onChange={handleChange}
          placeholder="Selecione una opcion"
          options={[
            { label: "Tramite", value: "Tramite" },
            { label: "Solicitud", value: "Solicitud" },
          ]}
        />
        <Input
          value={documento.fecha}
          type="date"
          name="fecha"
          onChange={handleChange}
          placeholder="Selecione la fecha"
        />
        <Input
          //value={documento.informacion}
          type="file"
          name="informacion"
          onChange={handleChange}
          placeholder="Cargue su archivo pdf"
        />
        <Select
          value={documento.area ?? ""}
          onChange={handleChange}
          placeholder="Selecciona un Asunto"
          name="area"
          options={[
            {
              label: areas[0].nombre,
              value: areas[0].id,
            },
          ]}
        />

        <Select
          value={documento.tipo ?? ""}
          onChange={handleChange}
          name="tipo"
          placeholder="Selecciona una opción"
          options={tipos.map((tipo) => ({
            label: tipo.nombre,
            value: tipo.id,
          }))}
        />
        <Button type="submit" label="Enviar Documento" />
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          {errors && (
            <p className="text-red-500">Todos los campos son requeridos</p>
          )}
        </div>
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">Volver a la pagina principal?</p>*{" "}
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
      <ModalTiket
        isOpen={isModalTiketOpen}
        onClose={closeModal}
        id={documento.id}
        remitente={documento.remitente}
        fecha={documento.fecha}
        asunto={documento.asunto}
        email={documento.email}
        label={
          isSuccess ? "🎉 TIKET DE TRAMITE 🎉" : "❌ Error al generar tiket ❌"
        }
        description={
          isSuccess
            ? "Ha generado correctamente su tiket."
            : "Error al generar tiket."
        }
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default Form;
