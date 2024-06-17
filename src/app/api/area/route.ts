import { prisma } from "@/libs/prisma"; // Import Prisma
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const areas = await prisma.area.findMany(); // Fetch all areas
    return new NextResponse(
      JSON.stringify({ areas, message: "Todos los documentos cargados" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error al obtener documentos:", error); // Improved error logging
    return new NextResponse(
      JSON.stringify({
        message: "Error al obtener documentos",
        error: error instanceof Error ? error.message : "Unknown error", // Provide detailed error message
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
