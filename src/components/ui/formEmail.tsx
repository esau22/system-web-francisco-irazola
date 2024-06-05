"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormEmailProps {
  handleShowModal: (show: boolean) => void;
  selectedDocument: {
    id: number;
    remitente: string;
    email: string;
    asunto: string;
  };
}

const FormEmail = ({ handleShowModal, selectedDocument }: FormEmailProps) => {
  const [emailContent, setEmailContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent,
          email: selectedDocument.email,
          asunto: selectedDocument.asunto,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar correo electrónico");
      }

      handleShowModal(false);
    } catch (error) {
      setErrorMessage(
        "No se pudo enviar el correo electrónico. Por favor, inténtelo de nuevo."
      );
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
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
            <input
              type="text"
              value={selectedDocument.remitente}
              disabled
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={selectedDocument.email}
              disabled
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Asunto
            </label>
            <input
              type="text"
              value={selectedDocument.asunto}
              disabled
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none focus:shadow-outline"
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
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none focus:shadow-outline"
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
      </div>
    </div>
  );
};

export default FormEmail;
