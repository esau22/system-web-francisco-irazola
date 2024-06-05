import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { emailContent, email, asunto } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // Reemplaza con tu dirección de correo
      to: [email], // Utiliza el correo del remitente
      subject: asunto,
      text: emailContent, // Aquí se usa el contenido del correo directamente
    });

    if (error) {
      console.error("Error al enviar correo electrónico:", error);
      // Manejo de errores si falla el envío del correo
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error al enviar correo electrónico:", error);
    return NextResponse.json(
      { error: "Error al enviar correo electrónico" },
      { status: 500 }
    );
  }
}
