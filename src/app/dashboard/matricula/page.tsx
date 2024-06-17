import Matricula from "@/components/tables/matricula";
import Title from "@/components/ui/title";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Matricula Page | Dashboard",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};
const MatriculaPage = () => {
  return (
    <>
      <Title pageName="Matricula" />
      <div className="flex flex-col gap-10">
        <Matricula />
      </div>
    </>
  );
};

export default MatriculaPage;
