import { NextResponse, NextRequest } from "next/server";
import prisma from "@/server/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if(req.method !== "POST") {
    return  Response.json({error: "Method Not Allowed"})
  }

  try {
    const hashPassword = await bcrypt.hash(password, 15);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return Response.json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export function GET() {
  return Response.json({message: "Hello World"})
}