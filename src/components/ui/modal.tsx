import { FC } from "react";
import Button from "./button";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  description: string;
  isSuccess?: boolean;
  estado_documento?: string;
  id?: number;
  remitente?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  label,
  description,
  isSuccess,
  estado_documento,
  id,
  remitente,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">
          {isSuccess ? (
            <FaCheckCircle className="inline-block mr-2 text-green-500" />
          ) : (
            <FaTimesCircle className="inline-block mr-2 text-red-500" />
          )}
          {label}
        </h2>

        {id && (
          <p className="mb-2">
            <strong>Numero de Tiket:</strong> {id}
          </p>
        )}
        {remitente && (
          <p className="mb-2">
            <strong>Remitente:</strong> {remitente}
          </p>
        )}
        {estado_documento && (
          <p className="mb-2">
            <strong>Estado del Documento:</strong> {estado_documento}
          </p>
        )}
        <p className="mb-4">{description}</p>
        <Button type="button" onClick={onClose} label="Cerrar" />
      </div>
    </div>
  );
};

export default Modal;
