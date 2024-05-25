"use client";
import ButtonIcon from "../ui/button-icon";
import { FiEye } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";
import { useEffect, useState } from "react";
import ModalDocuments from "../modal/modal_documents";

interface Document {
  id: number;
  asunto: string;
  remitente: string;
  email: string;
  fecha: string;
  //informacion: string;
  informacion: { type: string; data: number[] };
  estado_documento: string;
  area: string;
  tipo: string;
}

const TramiteDocumento = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/documents");
        if (!response.ok) {
          throw new Error("Error al obtener los documentos");
        }
        const data = await response.json();
        setDocuments(data.documents);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const generatePdf = (document: Document) => {
    // Aquí deberías tener la lógica para convertir document.informacion a PDF
    // Supongamos que pdfBlob contiene el PDF generado
    const byteArray = new Uint8Array(document.informacion.data);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    setPdfBlob(blob);
    setSelectedDocument(document);
    setShowModal(true);
  };

  return (
    <div className="rounded-sm border-4 border-stroke bg-white px-2 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-black">
        Lista de Tramites
      </h4>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-400 text-left dark:bg-meta-2">
              <th className="border border-gray-300 py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                N°Tramite
              </th>
              <th className="border border-gray-300 py-4 px-4 font-medium text-black dark:text-black">
                Remitente
              </th>
              <th className="border border-gray-300 py-4 px-4 font-medium text-black dark:text-black">
                Email
              </th>
              <th className="border border-gray-300 py-4 px-4 font-medium text-black dark:text-black">
                Asunto
              </th>
              <th className="border border-gray-300 py-4 px-4 font-medium text-black dark:text-black">
                Fecha
              </th>
              <th className="border border-gray-300 py-4 px-4 font-medium text-black dark:text-black">
                Tipo Documento
              </th>
              <th className="border border-gray-300 py-4 px-4 font-medium text-black dark:text-black">
                Área
              </th>
              <th className="border border-gray-300 py-4 px-4 font-medium text-black dark:text-black">
                Estado
              </th>
              <th className="border border-gray-300 py-4 px-4 font-medium text-black dark:text-black">
                Visualizar
              </th>
              <th className="border border-gray-300 py-4 px-4 font-medium text-black dark:text-black">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, key) => (
              <tr key={key}>
                <td className="border border-gray-300 py-5 px-4 pl-9 dark:border-strokedark sm:pl-11">
                  <h5 className="font-medium text-black dark:text-black">
                    {document.id}
                  </h5>
                </td>
                <td className="border border-gray-300 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-black">
                    {document.remitente}
                  </p>
                </td>
                <td className="border border-gray-300 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-black">{document.email}</p>
                </td>
                <td className="border border-gray-300 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-black">
                    {document.asunto}
                  </p>
                </td>
                <td className="border border-gray-300 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-black">{document.fecha}</p>
                </td>
                <td className="border border-gray-300 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-black">{document.tipo}</p>
                </td>
                <td className="border border-gray-300 py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-black">{document.area}</p>
                </td>
                <td className="border border-gray-300 py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      document.estado_documento === "Pendiente"
                        ? "text-green-300 bg-green-300"
                        : document.estado_documento === "Finalizado"
                        ? "text-red-900 bg-red-900"
                        : "text-yellow-500 bg-yellow-500"
                    }`}
                  >
                    {document.estado_documento}
                  </p>
                </td>
                <td className="border border-gray-300 py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <ButtonIcon
                      onClick={() => generatePdf(document)}
                      icon={FiEye}
                    />
                  </div>
                </td>
                <td className="border border-gray-300 py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <ButtonIcon icon={IoMdDownload} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <ModalDocuments
          handleShowModal={() => setShowModal(false)}
          selectedDocument={selectedDocument}
          pdfBlob={pdfBlob} // Pasamos el blob del PDF al modal
        />
      )}
    </div>
  );
};

export default TramiteDocumento;
