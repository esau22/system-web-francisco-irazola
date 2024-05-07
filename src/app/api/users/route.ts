import { Usuario } from "@prisma/client";
import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { isValidEmail } from "@/utils/isValidEmail";

export async function GET() {
  try {
    const users = await prisma.usuario.findMany();
    return new Response(
      JSON.stringify({ users, message: "All users loaded" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.ts:11 ~ GET ~ error:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user, email, password, confirmPassword, rol } =
      await request.json();

    if (!user || !email || !password || !confirmPassword || !rol) {
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

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          message: "Email no valido",
        },
        {
          status: 400,
        }
      );
    }

    if (password !== confirmPassword) {
      return new Response(
        JSON.stringify({
          message: "La contraseña y la confirmación no coinciden",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const existingUser = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          message: "El correo electrónico ya está registrado",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Si todo está bien, crear el usuario en la base de datos con Prisma
    const newUser: Usuario = await prisma.usuario.create({
      data: {
        user,
        email,
        password: hashedPassword,
        rol,
        // Otros campos del usuario
      },
      select: {
        id: true,
        user: true,
        email: true,
        rol: true,
        password: true,
      },
    });
    return new Response(
      JSON.stringify({
        message: "Usuario creado exitosamente",
        user: newUser,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creando usuario:", error);
    return new Response(
      JSON.stringify({
        message: "Error al crear usuario",
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

/*export async function PUT(req: Request) {
  try {
    const user = (await req.json()) as Usuario;
    console.log("🚀 ~ file: route.ts:41 ~ PUT ~ user:", user);

    const userUpdated = await prisma.usuario.update({
      where: { id: user.id },
      data: user,
    });
    return new Response(
      JSON.stringify({ userUpdated, message: "Se ha actualizado con éxito" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.ts:53 ~ PUT ~ error:", error);
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    const postId =
      typeof id === "string"
        ? parseInt(id)
        : Array.isArray(id)
        ? parseInt(id[0])
        : id;
    const userDeleted = await prisma.usuario.delete({
      where: { id: postId },
    });
    return new Response(
      JSON.stringify({ userDeleted, message: "Se ha eliminado con éxito" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.ts:78 ~ DELETE ~ error:", error);
  }
}*/
