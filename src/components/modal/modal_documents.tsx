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
      className="flex justify-center items-center w-full h-full absolute top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md"
      onClick={handleShowModal}
    >
      <div
        onAuxClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow px-16"
      >
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
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
        <div className="flex flex-col items-center">
          <h3 className="text-2xl mb-0.5 font-medium">Documento PDF</h3>
          {pdfBlob ? (
            <iframe
              ref={iframeRef}
              title="PDF Viewer"
              width="180%"
              height="400"
              className="border-none mt-4"
            />
          ) : (
            <p>No se ha podido cargar el PDF.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalDocuments;
