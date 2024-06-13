import { FC } from "react";
import Button from "./button";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketNumber: string;
  fecha: string;
  applicantName: string;
  applicantID: string;
  email: string;
  documentType: string;
  subject: string;
  description: string;
  pages: number;
  observations: string;
  isSuccess?: boolean;
}

const ModalTiket: FC<ModalProps> = ({
  isOpen,
  onClose,
  ticketNumber,
  receptionDate,
  applicantName,
  applicantID,
  email,
  phone,
  documentType,
  subject,
  description,
  pages,
  observations,
  isSuccess,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-md shadow-md text-center max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">
          {isSuccess ? (
            <FaCheckCircle className="inline-block mr-2 text-green-500" />
          ) : (
            <FaTimesCircle className="inline-block mr-2 text-red-500" />
          )}
          Registro de Documento
        </h2>
        <p className="mb-2">
          <strong>N° de Ticket:</strong> {ticketNumber}
        </p>
        <p className="mb-2">
          <strong>Fecha y Hora de Recepción:</strong> {receptionDate}
        </p>
        <p className="mb-2">
          <strong>Nombre del Solicitante:</strong> {applicantName}
        </p>
        <p className="mb-2">
          <strong>DNI:</strong> {applicantID}
        </p>
        <p className="mb-2">
          <strong>Correo Electrónico:</strong> {email}
        </p>
        <p className="mb-2">
          <strong>Teléfono:</strong> {phone}
        </p>
        <p className="mb-2">
          <strong>Tipo de Documento:</strong> {documentType}
        </p>
        <p className="mb-2">
          <strong>Asunto del Documento:</strong> {subject}
        </p>
        <p className="mb-4">
          <strong>Descripción del Documento:</strong> {description}
        </p>
        <p className="mb-2">
          <strong>Número de Páginas:</strong> {pages}
        </p>
        <p className="mb-4">
          <strong>Observaciones:</strong> {observations}
        </p>
        <Button type="button" onClick={onClose} label="Cerrar" />
      </div>
    </div>
  );
};

export default ModalTiket;
