import TramiteDocumento from "@/components/tables/tramite_documento";
import Title from "@/components/ui/title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tramite Page | Dashboard",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};
const Tramite = () => {
  return (
    <>
      <Title pageName="Tramite de Documento" />
      <div className="flex flex-col gap-10">
        <TramiteDocumento />
      </div>
    </>
  );
};

export default Tramite;
