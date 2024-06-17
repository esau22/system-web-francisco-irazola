import Users from "@/components/tables/users";
import Title from "@/components/ui/title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuario Page | Dashboard",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};
const User = () => {
  return (
    <>
      <Title pageName="Registro de Usuarios" />
      <div className="flex flex-col ">
        <Users />
      </div>
    </>
  );
};

export default User;
