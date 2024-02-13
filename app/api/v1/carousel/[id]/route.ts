import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/db";
import { Carousel } from "@prisma/client";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {

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
