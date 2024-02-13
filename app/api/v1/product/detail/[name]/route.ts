import prisma from "@/server/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { name: string } }
  ) {
    const { name } = params;
  
    try {
      const product = await prisma.product.findFirst({
        where: { name: name },
      });
  
      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
      console.error("Error fetching product:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }