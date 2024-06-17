"use client";
import ButtonIcon from "../ui/button-icon";
import { FiEye } from "react-icons/fi";
import { FC, useEffect, useState } from "react";
import ModalDocuments from "../modal/modal_documents";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import ModalUser from "../modal/modal_user";
import FormEmail from "../ui/formEmail";
import Pagination from "../pagination/pagination";

interface Document {
  id: number;
  asunto: string;
  remitente: string;
  email: string;
  fecha: string;
  informacion: { type: string; data: number[] };
  estado_documento: string;
  area: string;
  areaId: number;
  tipo: string;
}

interface Area {
  id: number;
  nombre: string;
}

const TramiteDocumento: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [documents, setDocuments] = useState<Document[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 4; // Show 4 documents per page

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

  const updateDocumentStatus = async (id: number, estado_documento: string) => {
    try {
      const response = await fetch(`/api/documents`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, estado_documento }),
      });

      if (!response.ok) {
        throw new Error("Failed to update document status");
      }

      const updatedDocument = await response.json();

      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.id === id ? { ...doc, estado_documento } : doc
        )
      );
    } catch (error) {
      console.error("Error updating document status:", error);
      // Manejar el error si es necesario
    }
  };

  const updateDocumentArea = async (id: number, areaId: number) => {
    try {
      const response = await fetch(`/api/documents`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, areaId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update document area");
      }

      const updatedDocument = await response.json();
      //console.log("Documento actualizado:", updatedDocument);

      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) => (doc.id === id ? { ...doc, areaId } : doc))
      );
    } catch (error) {
      console.error("Error updating document area:", error);
      // Manejar el error si es necesario
    }
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("/api/area");
        if (!response.ok) {
          throw new Error("Error al obtener las áreas");
        }
        const data = await response.json();
        //console.log("Áreas obtenidas:", data.areas);
        setAreas(data.areas); // Actualiza el estado 'areas' con los datos recibidos
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchAreas();
  }, []);

  const deleteDocument = async (id: number) => {
    try {
      const response = await fetch(`/api/documents`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.id !== id)
      );
    } catch (error) {
      console.error("Error deleting document:", error);
      // Manejar el error si es necesario
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-CA"); // 'en-CA' is the locale for ISO 8601 date format
  };

  const generatePdf = (document: Document) => {
    const byteArray = new Uint8Array(document.informacion.data);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    setPdfBlob(blob);
    setSelectedDocument(document);
    setShowModal(true);
  };

  const openEmailModal = (document: Document) => {
    setSelectedDocument(document);
    setShowModalEmail(true);
  };

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
      <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-800">
        Lista de Tramites
      </h4>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-600 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="px-4 py-3">N°</th>
              <th className="px-4 py-3">Remitente</th>
              <th className="px-4 py-3">Asunto</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Tipo Documento</th>
              <th className="px-4 py-3">Área</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            {Array.isArray(currentDocuments) &&
              currentDocuments.map((document, id) => (
                <tr key={id} className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3 text-sm font-semibold">
                    {document.id}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    {document.remitente}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    {document.asunto}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    {formatDate(document.fecha)}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    {document.tipo}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    <select
                      className={`rounded-full px-2 py-1 font-semibold leading-tight ${
                        document.areaId === 1
                          ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"
                          : document.areaId === 2
                          ? "text-blue-700 bg-blue-100 dark:bg-blue-700 dark:text-blue-100"
                          : ""
                      }`}
                      value={document.areaId}
                      onChange={(e) => {
                        const newAreaId = parseInt(e.target.value);
                        //console.log(
                        //"Nuevo ID de área seleccionada:",
                        //</td>newAreaId
                        //); // Nuevo valor del área seleccionada
                        updateDocumentArea(document.id, newAreaId);
                      }}
                    >
                      {areas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.nombre}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold">
                    <select
                      className={`rounded-full px-2 py-1 font-semibold leading-tight ${
                        document.estado_documento === "Pendiente"
                          ? "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100"
                          : document.estado_documento === "Finalizado"
                          ? "text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100"
                          : ""
                      }`}
                      value={document.estado_documento}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        updateDocumentStatus(document.id, newStatus);
                      }}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <ButtonIcon
                        onClick={() => generatePdf(document)}
                        icon={FiEye}
                      />
                      <ButtonIcon
                        onClick={() => deleteDocument(document.id)}
                        icon={RiDeleteBin5Fill}
                      />
                      <ButtonIcon
                        onClick={() => openEmailModal(document)}
                        icon={MdOutlineEmail}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={documentsPerPage}
        totalItems={documents.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {showModal && (
        <ModalDocuments
          handleShowModal={() => setShowModal(false)}
          selectedDocument={selectedDocument}
          pdfBlob={pdfBlob}
        />
      )}
      {showModalEmail && selectedDocument && (
        <ModalUser handleShowModal={() => setShowModal(false)}>
          <FormEmail
            handleShowModal={setShowModalEmail}
            selectedDocument={selectedDocument}
          />
        </ModalUser>
      )}
    </div>
  );
};

export default TramiteDocumento;
