import type { Metadata } from "next";
import Logo from "@/components/shared/logo";
import Form from "./components/form";

export const metadata: Metadata = {
  title: "Detail Documents | Documents",
  description: "Detail Documents | Documents",
};

export default function DetailDocuments() {
  return (
    <section className="h-full flex flex-col items-center justify-center">
      <Logo />
      <Form />
    </section>
  );
}
