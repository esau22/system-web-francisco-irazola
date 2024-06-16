import { FC } from "react";
import Button from "./button";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ModalTiketProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  description: string;
  id?: number;
  remitente: string;
  asunto: string;
  email: string;
  fecha: string;
  isSuccess?: boolean;
}

const ModalTiket: FC<ModalTiketProps> = ({
  isOpen,
  onClose,
  label,
  description,
  id,
  remitente,
  asunto,
  email,
  fecha,
  isSuccess,
}) => {
  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    const content = document.getElementById("modal-content")?.innerHTML;
    if (content) {
      const printWindow = window.open("", "", "width=800,height=600");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Document PDF</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                }
                .title {
                  font-size: 24px;
                  margin-bottom: 20px;
                }
                .content p {
                  margin: 5px 0;
                }
              </style>
            </head>
            <body>
              <div class="title">${label}</div>
              <div class="content">${content}</div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
    onClose(); // Close the modal after downloading the PDF
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-md shadow-md text-center max-w-lg">
        <div id="modal-content">
          <h2 className="text-2xl font-semibold mb-4">
            {isSuccess ? (
              <FaCheckCircle className="inline-block mr-2 text-green-500" />
            ) : (
              <FaTimesCircle className="inline-block mr-2 text-red-500" />
            )}
            {label}
          </h2>
          <p className="mb-4">{description}</p>
          <p className="mb-2">
            <strong>N° de Ticket:</strong> {id}
          </p>
          <p className="mb-2">
            <strong>Fecha de Recepción:</strong> {fecha}
          </p>
          <p className="mb-2">
            <strong>Nombre del Solicitante:</strong> {remitente}
          </p>
          <p className="mb-2">
            <strong>Asunto:</strong> {asunto}
          </p>
          <p className="mb-2">
            <strong>Correo Electrónico:</strong> {email}
          </p>
        </div>

        <Button
          type="button"
          onClick={handleDownloadPDF}
          label="Descargar PDF y Cerrar"
        />
      </div>
    </div>
  );
};

export default ModalTiket;
