import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/utils/isValidEmail";
import { prisma } from "@/libs/prisma"; // Importa Prisma
//import fs from "fs";

export async function GET() {
  try {
    const documents = await prisma.documento.findMany({
      include: {
        area: true,
        tipo: true,
      },
    });

    // Mapear documentos para incluir los nombres de tipo y área
    const formattedDocuments = documents.map((doc) => ({
      ...doc,
      tipo: doc.tipo.nombre,
      area: doc.area.nombre,
    }));

    return new Response(
      JSON.stringify({
        documents: formattedDocuments,
        message: "Todos los documentos cargados",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    return new Response(
      JSON.stringify({
        message: "Error al obtener documentos",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const { remitente, email, asunto, fecha, informacion, tipo, area } =
      await request.json();
    console.log("Received data:", {
      remitente,
      email,
      asunto,
      fecha,
      tipo,
      area,
    });
    console.log("Informacion length:", informacion.length);
    // Verifica si hay campos faltantes
    if (
      !remitente ||
      !email ||
      !asunto ||
      !fecha ||
      !informacion ||
      !tipo ||
      !area
    ) {
      return new Response(
        JSON.stringify({
          message: "Todos los campos son obligatorios",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Valida el formato del correo electrónico
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          message: "Email no válido",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Valida la existencia del tipo y área especificados
    const existingTipo = await prisma.tipo_Documento.findUnique({
      where: { id: tipo },
    });
    if (!existingTipo) {
      return new Response(
        JSON.stringify({
          message: "El tipo de documento especificado no existe",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const existingArea = await prisma.area.findUnique({
      where: { id: area },
    });
    if (!existingArea) {
      return new Response(
        JSON.stringify({
          message: "El área especificada no existe",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Sube el archivo PDF al almacenamiento en la nube (Supabase, AWS S3, etc.)
    const informacionBuffer = Buffer.from(informacion.data);
    // Aquí implementa la lógica para subir el archivo a tu proveedor de almacenamiento en la nube y obtén la URL del archivo

    // Crea el nuevo documento en la base de datos con Prisma
    const newDocument = await prisma.documento.create({
      data: {
        remitente,
        email,
        asunto,
        fecha: new Date(fecha), // Convierte fecha a objeto Date
        informacion: informacionBuffer,
        estado_documento: "Pendiente", // Asigna un estado por defecto
        tipo: { connect: { id: tipo } },
        area: { connect: { id: area } },
      },
      include: {
        tipo: true,
        area: true,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Documento creado exitosamente",
        document: newDocument,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error al crear documento:", error); // Mejora el manejo de errores
    return new Response(
      JSON.stringify({
        message: "Error al crear documento",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
