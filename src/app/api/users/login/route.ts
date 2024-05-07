import { Usuario } from "@prisma/client";
import { prisma } from "@/libs/prisma";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          message: "Correo electrónico y contraseña son obligatorios",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const user = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          message: "Credenciales inválidas",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new Response(
        JSON.stringify({
          message: "Credenciales inválidas",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Devolver algún identificador único del usuario
    return new Response(
      JSON.stringify({
        message: "Inicio de sesión exitoso",
        userId: user.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return new Response(
      JSON.stringify({
        message: "Error al iniciar sesión",
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
