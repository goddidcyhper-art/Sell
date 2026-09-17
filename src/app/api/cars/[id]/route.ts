import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cars = await prisma.car.findMany({
    orderBy: { createdAt: "desc" },
    include: { seller: true },
  });

  return NextResponse.json(cars);
}
