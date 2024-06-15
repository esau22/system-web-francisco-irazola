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
          src="/images/cards/colegio.jpg"
          alt="Hero"
          fill
          className="object-cover"
        />
        <Container>
          <div className="absolute bg-gradient-to-tr from-black to-transparent left-0 top-0 w-full h-full" />
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 lg:left-60 -translate-x-1/2 lg:translate-x-0 space-y-6">
            <h1 className="text-white text-6xl lg:text-8xl font-semibold text-center lg:text-left">
              Institución Educativa <br /> Francisco Irazola
            </h1>
            <p className="text-gray-300">
              La I.E.E.Francisco Irazola con R.M.N° 0318-2010-ED es denominada
              Emblematica oir su prestigio.
              <br /> Nuestra I.E.E se creo el año 1960 con un promotor el
              prof.David Pérez.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Button
                type="button"
                label="Tramite de Documento"
                className="w-full"
                onClick={() => router.push("/documents/register")}
              />
              <a
                href="https://cdn.www.gob.pe/uploads/document/file/520793/formulario-unico-de-tramites.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  type="button"
                  label="Descargar FUT"
                  className="w-full"
                />
              </a>
              <Button
                type="button"
                label="Consultar Tramite"
                className="w-full"
                onClick={() => router.push("/documents/detail")}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
