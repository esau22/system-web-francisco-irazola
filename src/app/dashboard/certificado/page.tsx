import Certificado from "@/components/tables/certificado";
import Title from "@/components/ui/title";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Certicado Page | Dashboard",
  description: "This is Tables page for TailAdmin Next.js",
};
const CertificadoPage = () => {
  return (
    <>
      <Title pageName="Certificado De Estudios" />
      <div className="flex flex-col gap-10">
        <Certificado />
      </div>
    </>
  );
};

export default CertificadoPage;
