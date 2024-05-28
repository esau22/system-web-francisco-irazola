"use client";
import { useEffect, useRef } from "react";

interface Document {
  id: number;
  asunto: string;
  remitente: string;
  email: string;
  fecha: string;
  informacion: { type: string; data: number[] };
  estado_documento: string;
  area: string;
  tipo: string;
}

interface ModalDocumentsProps {
  handleShowModal: () => void;
  selectedDocument: Document | null;
  pdfBlob: Blob | null; // Cambiado a ArrayBuffer
}

const ModalDocuments = ({ handleShowModal, pdfBlob }: ModalDocumentsProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (pdfBlob && iframeRef.current) {
      const blob = new Blob([pdfBlob], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;
      return () => URL.revokeObjectURL(url);
    }
  }, [pdfBlob]);

  return (
    <div
      className="flex justify-center items-center w-full h-full fixed top-0 left-0  backdrop-filter backdrop-brightness-75 backdrop-blur-md rounded-lg shadow-md dark:bg-gray-600"
      onClick={handleShowModal}
      onAuxClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="absolute top-3 right-2.5 text-gray-300 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
        onClick={handleShowModal}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="#c6c7c7"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close popup</span>
      </button>
      {pdfBlob ? (
        <iframe
          ref={iframeRef}
          title="PDF Viewer"
          width="70%"
          height="500"
          className="border-none px-10"
        />
      ) : (
        <p>No se ha podido cargar el PDF.</p>
      )}
    </div>
  );
};

export default ModalDocuments;
