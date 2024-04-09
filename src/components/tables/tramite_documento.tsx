import { Package } from "@/types/matricula";
import ButtonIcon from "../ui/button-icon";
import { FiEye } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";

const certificadoData: Package[] = [
  {
    name: "Free package",
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Business Package",
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: "Unpaid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Pending",
  },
];
const TramiteDocumento = () => {
  return (
    <div className="rounded-sm border-4 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-black">
        Lista de Tramites
      </h4>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                N° Tramite
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-black">
                Tipo Documento
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black">
                DNI
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black">
                Remitente
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black">
                Área
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black">
                Seguimiento
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-black">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {certificadoData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark sm:pl-11">
                  <h5 className="font-medium text-black dark:text-black">
                    {packageItem.name}
                  </h5>
                  <p className="text-black">${packageItem.price}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-black">
                    {packageItem.invoiceDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      packageItem.status === "Paid"
                        ? "text-green-300 bg-green-300"
                        : packageItem.status === "Unpaid"
                        ? "text-red-900 bg-red-900"
                        : "text-yellow-500 bg-yellow-500"
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <ButtonIcon icon={FiEye} />
                    <ButtonIcon icon={IoMdDownload} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TramiteDocumento;
