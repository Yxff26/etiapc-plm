import { connectDB } from "@/lib/db/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Token no proporcionado" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Token inválido o expirado" },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Error en validate-reset-token:", error);
    return NextResponse.json(
      { message: "Ocurrió un error al validar el token" },
      { status: 500 }
    );
  }
} 