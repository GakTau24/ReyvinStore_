import prisma from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const category = await prisma.categories.findMany()
    return NextResponse.json({category: category}, {status: 200})
}