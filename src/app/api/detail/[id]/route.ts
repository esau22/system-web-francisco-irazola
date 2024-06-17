import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
