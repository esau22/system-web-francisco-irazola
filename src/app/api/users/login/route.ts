import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
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

    // Configuración directa de la cookie de autenticación
    const cookie = `auth=true; Path=/; HttpOnly; SameSite=Lax`;
    //const cookie = `auth=true; Path=/; HttpOnly; SameSite=Lax; Secure`;
    const response = new Response(
      JSON.stringify({
        message: "Inicio de sesión exitoso",
        userId: user.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // Configurar la cookie en el encabezado de la respuesta
          "Set-Cookie": cookie,
        },
      }
    );

    return response;
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

export async function DELETE(request: NextRequest) {
  // Configurar la cookie con una fecha de expiración en el pasado para eliminarla
  const expiredCookie = `auth=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  const response = new Response(
    JSON.stringify({
      message: "Sesión cerrada exitosamente",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Configurar la cookie en el encabezado de la respuesta
        "Set-Cookie": expiredCookie,
      },
    }
  );

  return response;
}
