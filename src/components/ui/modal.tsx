import { FC } from "react";
import Button from "./button";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  description: string;
  isSuccess?: boolean;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  label,
  description,
  isSuccess,
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
        <p className="mb-4">{description}</p>
        <Button type="button" onClick={onClose} label="Cerrar" />
      </div>
    </div>
  );
};

export default Modal;
