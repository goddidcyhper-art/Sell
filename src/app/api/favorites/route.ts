import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: Number(session.user.id) },
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(favorites.map((item) => item.car));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { carId } = await req.json();

  const exists = await prisma.favorite.findUnique({
    where: {
      userId_carId: {
        userId: Number(session.user.id),
        carId: Number(carId),
      },
    },
  });

  if (exists) {
    await prisma.favorite.delete({
      where: { id: exists.id },
    });
    return NextResponse.json({ removed: true });
  }

  const favorite = await prisma.favorite.create({
    data: {
      userId: Number(session.user.id),
      carId: Number(carId),
    },
  });

  return NextResponse.json({ favorite, added: true });
}
