import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/db";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import { Carousel } from "@prisma/client";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(handler);
  if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
      const body = await request.json();
      const updatedCarousel = await prisma.carousel.update({
          where: { id: params.id },
          data: { image: body.image },
      });
      return NextResponse.json({ success: true, updatedCarousel }, { status: 200 });
  } catch (error) {
      console.error("Error updating carousel:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
