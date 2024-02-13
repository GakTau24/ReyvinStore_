import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/db";
import { getServerSession } from "next-auth";

export async function GET() {
  const carousel = await prisma.carousel.findMany({});
  return NextResponse.json({ carousel }, { status: 200 });
}

export async function POST(req: NextRequest) {
    const body = await req.json()

    const carousel = await prisma.carousel.create({
        data: {
            image: body.image
        }
    })

    return NextResponse.json({ carousel }, { status: 201 })
}

export async function DELETE(req:NextRequest) {
    const body = await req.json();
    const { id } = body
    const carousel = await prisma.carousel.delete({
        where: {id: id}
    })
    return NextResponse.json({carousel})
}