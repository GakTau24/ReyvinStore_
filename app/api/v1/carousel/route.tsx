import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/db";
import { getServerSession } from "next-auth";
import { handler } from "../../auth/[...nextauth]/route";

export async function GET() {
  const carousel = await prisma.carousel.findMany({});
  return NextResponse.json({ carousel }, { status: 200 });
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(handler)
    if(!session) {
    return NextResponse.json({message: "Unauthorize!"}, {status: 401})
    }
    const body = await req.json()

    const carousel = await prisma.carousel.create({
        data: {
            image: body.image
        }
    })

    return NextResponse.json({ carousel }, { status: 201 })
}

export async function DELETE(req:NextRequest) {
    const session = await getServerSession(handler)
    if(!session) {
        return NextResponse.json({message: "Unauthorize!"}, {status: 401})
    }
    const body = await req.json();
    const { id } = body
    const carousel = await prisma.carousel.delete({
        where: {id: id}
    })
    return NextResponse.json({carousel})
}