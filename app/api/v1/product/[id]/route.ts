import prisma from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@prisma/client";
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(handler);
  if (!session) {
    return NextResponse.json({ message: "Unauthorize!" }, { status: 401 });
  }

  const body: Product = await request.json();
  const product = await prisma.product.update({
    where: {
      id: params.id,
    },
    data: {
      name: body.name,
      image: body.image,
      price: body.price,
      categoryId: body.categoryId,
    },
  });
  return NextResponse.json({ success: true, status: 200 });
};
