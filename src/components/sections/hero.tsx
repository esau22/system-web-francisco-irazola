"use client";
import Image from "next/image";
import Container from "../shared/container";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section id="home">
      <div className="relative w-full h-screen">
        <Image
          src="/images/cards/cards-01.png"
          alt="Hero"
          fill
          className="object-cover"
        />
        <Container>
          <div className="absolute bg-gradient-to-tr from-black to-transparent left-0 top-0 w-full h-full" />
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 lg:left-60 -translate-x-1/2 lg:translate-x-0 space-y-6">
            <h1 className="text-white text-6xl lg:text-8xl font-semibold text-center lg:text-left">
              Tu trámite <br /> se agilizará
            </h1>
            <p className="text-gray-300">
              Estamos comprometidos a ayudarte a transformar tu vida como parte
              de nuestro
              <br /> compromiso contigo. Cambia para una educación mejor.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Button
                type="button"
                label="Tramite de Documento"
                className="w-full"
                onClick={() => router.push("/documents/register")}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
