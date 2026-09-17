const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const uploadDir = path.join(__dirname, "..", "public", "uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  const demoPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@example.com",
      passwordHash: demoPassword,
      role: "admin",
    },
  });

  const cars = [
    {
      title: "2023 BMW M340i",
      brand: "BMW",
      year: 2023,
      price: 48500,
      mileage: 18000,
      fuel: "Gasoline",
      transmission: "Automatic",
      location: "Austin, TX",
      sellerName: "North Ridge Motors",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      status: "approved",
      sellerId: user.id,
    },
    {
      title: "2022 Honda Civic Sport",
      brand: "Honda",
      year: 2022,
      price: 28900,
      mileage: 21500,
      fuel: "Gasoline",
      transmission: "Automatic",
      location: "Seattle, WA",
      sellerName: "Apex Auto",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      status: "approved",
      sellerId: user.id,
    },
    {
      title: "2024 Tesla Model 3 Performance",
      brand: "Tesla",
      year: 2024,
      price: 52900,
      mileage: 9000,
      fuel: "Electric",
      transmission: "Automatic",
      location: "Miami, FL",
      sellerName: "Bluebird EV",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      status: "approved",
      sellerId: user.id,
    },
    {
      title: "2021 Range Rover Evoque",
      brand: "Land Rover",
      year: 2021,
      price: 38900,
      mileage: 26000,
      fuel: "Diesel",
      transmission: "Automatic",
      location: "Denver, CO",
      sellerName: "Summit Autos",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      status: "approved",
      sellerId: user.id,
    },
  ];

  for (const car of cars) {
    await prisma.car.upsert({
      where: {
        id: ((await prisma.car.findFirst({ where: { title: car.title } })) || { id: -1 }).id,
      },
      update: {},
      create: car,
    });
  }

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
