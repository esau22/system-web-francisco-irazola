"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Input from "./input";
import Modal from "./modal";

interface FormEmailProps {
  handleShowModal: (show: boolean) => void;
  selectedDocument: {
    id: number;
    remitente: string;
    email: string;
    asunto: string;
    subject?: string;
  };
}

const FormEmail = ({ handleShowModal, selectedDocument }: FormEmailProps) => {
  const [emailContent, setEmailContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent,
          email: selectedDocument.email,
          asunto: selectedDocument.subject,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Respuesta no enviada.");
        setIsSuccess(false);
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      setErrorMessage(
        "No se pudo enviar el correo electrónico. Por favor, inténtelo de nuevo."
      );
      setIsSuccess(false);
      console.error(error);
    } finally {
      setIsModalOpen(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      setEmailContent("");
      handleShowModal(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
            Enviar Respuesta al Usuario
          </h2>
        </div>
        <form onSubmit={sendEmail} className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Remitente
            </label>
            <Input
              type="text"
              value={selectedDocument.remitente}
              name="remitente"
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-600 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Email
            </label>
            <Input
              type="text"
              value={selectedDocument.email}
              name="email"
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-600 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Contenido del Mensaje
            </label>
            <textarea
              value={emailContent}
              onChange={handleChange}
              placeholder="Escriba su mensaje aquí..."
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-600 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Enviar
            </button>
          </div>
        </form>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          label={
            isSuccess
              ? "🎉 Envio exitoso! 🎉"
              : "❌ Error de Envio de Respuesta ❌"
          }
          description={
            isSuccess ? "Has enviado respuesta correctamente." : errorMessage
          }
          isSuccess={isSuccess}
        />
      </div>
    </div>
  );
};

export default FormEmail;
