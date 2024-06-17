"use client";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import ButtonIcon from "@/components/ui/button-icon";
import { RiFacebookFill, RiGithubFill, RiGoogleFill } from "react-icons/ri";

interface Document {
  id: number;
  remitente: string;
  estado_documento: string;
}

const Form: FC = () => {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [estadoDocumento, setEstadoDocumento] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/detail/${id}`);
      const data = await response.json();

      if (response.ok) {
        handleSuccess(data);
      } else {
        handleError(data.message || "Error al buscar el documento.");
      }
    } catch (error) {
      handleError("Error al buscar el documento.");
    } finally {
      setShowModal(true);
    }
  };

  const handleSuccess = (data: any) => {
    setSelectedDocument({
      id: data.id,
      remitente: data.remitente,
      estado_documento: data.estado_documento,
    });
    setEstadoDocumento(data.estado_documento);
    setIsSuccess(true);
    setError("");
    // Redirigir a la página principal
    //router.push("/");
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsSuccess(false);
    setSelectedDocument(null);
    setEstadoDocumento("");
    // Limpiar el input
    setId("");
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
    setEstadoDocumento("");
    setIsSuccess(false);
    setError("");
    setId("");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Buscar Documento por ID</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="text"
            value={id}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setId(e.target.value)
            }
            placeholder="Ingrese número de documento"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <Button type="submit" label="Consultar" />
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">Volver a la Pagina Principal?</p>
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
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          id={selectedDocument?.id || 0}
          remitente={selectedDocument?.remitente || ""}
          estado_documento={estadoDocumento}
          label={isSuccess ? "🎉 Documento encontrado! 🎉" : "❌ Error ❌"}
          description={
            isSuccess
              ? "Documento existente!!"
              : error || "Error al buscar el documento."
          }
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
};

export default Form;
