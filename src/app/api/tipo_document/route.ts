import { prisma } from "@/libs/prisma"; // Importa Prisma

export async function GET() {
  try {
    const tipos = await prisma.tipo_Documento.findMany(); // Cambia el nombre de la variable para que sea plural
    return new Response(
      JSON.stringify({ tipos, message: "Todos los documentos cargados" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error al obtener documentos:", error); // Mejora el manejo de errores
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
