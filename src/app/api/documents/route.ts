import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/utils/isValidEmail";
import { prisma } from "@/libs/prisma"; // Importa Prisma

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
    //console.log("Informacion length:", informacion.length);
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

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const { id, estado_documento } = await request.json();

    // Validar los datos de la solicitud
    if (!estado_documento || !id) {
      return new NextResponse(
        JSON.stringify({ message: "estado_documento is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Actualizar el estado del documento
    await prisma.documento.update({
      where: { id: parseInt(id, 10) }, // Asegúrate de convertir el ID a número si es necesario
      data: { estado_documento },
    });

    // Retornar la respuesta de éxito
    return new NextResponse(
      JSON.stringify({
        message: "Documento actualizado exitosamente",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    // Establecer el mensaje de error predeterminado
    let errorMessage = "Error al actualizar el estado del documento";

    // Verificar si el error es de tipo Error
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Registrar el error para depuración
    console.error("Error al actualizar el estado del documento:", error);

    // Retornar una respuesta de error
    return new NextResponse(
      JSON.stringify({
        message: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await request.json();

    // Validar los datos de la solicitud
    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "estado_documento is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Actualizar el estado del documento
    await prisma.documento.delete({
      where: { id: parseInt(id, 10) }, // Asegúrate de convertir el ID a número si es necesario
    });

    // Retornar la respuesta de éxito
    return new NextResponse(
      JSON.stringify({
        message: "Documento eliminado exitosamente",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    // Establecer el mensaje de error predeterminado
    let errorMessage = "Error al actualizar el estado del documento";

    // Verificar si el error es de tipo Error
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Registrar el error para depuración
    console.error("Error al actualizar el estado del documento:", error);

    // Retornar una respuesta de error
    return new NextResponse(
      JSON.stringify({
        message: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
