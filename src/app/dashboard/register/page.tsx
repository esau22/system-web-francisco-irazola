import type { Metadata } from "next";
import Form from "./components/form";

export const metadata: Metadata = {
  title: "Register | Auth",
  description: "Register | Auth",
};

export default function Register() {
  return (
    <section className="h-full flex flex-col items-center justify-center">
      <Form />
    </section>
  );
}
