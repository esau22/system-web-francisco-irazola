import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: any, { params }) {
  const id = parseInt(params.id);
  try {
    const users = await prisma.documento.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
