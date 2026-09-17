import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cars = await prisma.car.findMany({
    orderBy: { createdAt: "desc" },
    include: { seller: true, favorites: true },
  });

  return NextResponse.json(cars);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const car = await prisma.car.create({
    data: {
      title: body.title,
      brand: body.brand,
      year: Number(body.year),
      price: Number(body.price),
      mileage: Number(body.mileage),
      fuel: body.fuel,
      transmission: body.transmission,
      location: body.location,
      sellerName: body.sellerName || "Private Seller",
      image: body.image,
      featured: Boolean(body.featured),
      status: "pending",
      sellerId: Number(session.user.id),
    },
  });

  return NextResponse.json(car);
}
