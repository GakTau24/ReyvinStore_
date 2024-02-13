import prisma from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { handler } from "../../auth/[...nextauth]/route";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Product } from "@prisma/client";

export async function GET(req: NextRequest, res: Response) {
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json({ products }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(handler)
  if(!session) {
    return NextResponse.json({message: "Unauthorize!"}, {status: 401})
  }

  const body = await req.json();
  
  try {
    const product = await prisma.product.create({
      data: {
        name: body.name,
        image: body.image,
        price: body.price,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(new Error("Failed to create product"), { status: 500 });
  }
}

// export async function PUT(req: NextRequest) {
//   const body = await req.json()
//   const { id } = body
//   try {
//     const products = await prisma.product.update({
//       where: { id: id },
//       data: {
//         name: body.name,
//         image: body.image,
//         price: body.price,
//         categoryId: body.categoryId,
//       },
//     })
//     return NextResponse.json({ products }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     return NextResponse.json(new Error("Failed to update product"), { status: 500 });
//   }
// }

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(handler)
  if(!session) {
    return NextResponse.json({message: "Unauthorize!"}, {status: 401})
  }
  
 try {
  const body = await req.json()
  const { id } = body
  const products = await prisma.product.delete({
    where: {id: id}
  })
  return NextResponse.json({products})
 } catch (error) {
  return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
 }
}