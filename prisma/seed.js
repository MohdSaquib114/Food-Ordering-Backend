const { PrismaClient, Role, Country } = require("./generated/prisma");
const { hashPassword } = require("../src/utils/hash");

const prisma = new PrismaClient();

async function main() {
  const managerPasswords = await Promise.all([
    hashPassword("manager1"),
    hashPassword("manager2"),
  ]);

  const memberPasswords = await Promise.all([
    hashPassword("member1"),
    hashPassword("member2"),
    hashPassword("member3"),
    hashPassword("member4"),
  ]);

  // Admin
  const admin = await prisma.user.create({
    data: {
      name: "Nick Fury",
      username: "nickfury",
      password: await hashPassword("admin123"),
      role: "ADMIN",
      country: "AMERICA",
    },
  });

  await prisma.user.createMany({
    data: [
      {
        name: "Captain Marvel",
        username: "captainmarvel",
        password: managerPasswords[0],
        role: Role.MANAGER,
        country: Country.INDIA,
      },
      {
        name: "Captain America",
        username: "captainamerica",
        password: managerPasswords[1],
        role: Role.MANAGER,
        country: Country.AMERICA,
      },
      {
        name: "Thanos",
        username: "thanos",
        password: memberPasswords[0],
        role: Role.MEMBER,
        country: Country.INDIA,
      },
      {
        name: "Thor",
        username: "thor",
        password: memberPasswords[1],
        role: Role.MEMBER,
        country: Country.INDIA,
      },
      {
        name: "Travis",
        username: "travis",
        password: memberPasswords[2],
        role: Role.MEMBER,
        country: Country.AMERICA,
      },
      {
        name: "Wanda",
        username: "wanda",
        password: memberPasswords[3],
        role: Role.MEMBER,
        country: Country.AMERICA,
      },
    ],
  });

  await prisma.paymentMethod.createMany({
    data: [
      {
        userId: admin.id,
        type: "CARD",
        details: {
          cardNumber: "**** **** **** 4242",
          expiry: "12/26",
          name: "Nick Fury",
        },
      },
      {
        userId: admin.id,
        type: "CARD",
        details: {
          cardNumber: "**** **** **** 1111",
          expiry: "11/25",
          name: "Nick Fury",
        },
      },
      {
        userId: admin.id,
        type: "UPI",
        details: {
          upiId: "nick.fury@upi",
        },
      },
      {
        userId: admin.id,
        type: "PAYPAL",
        details: {
          email: "nick.fury@shield.com",
        },
      },
    ],
  });

  await Promise.all([
    prisma.restaurant.create({
      data: {
        name: "Chennai Curry House",
        country: "INDIA",
        menuItems: {
          create: [
            {
              name: "Masala Dosa",
              description: "South Indian classic",
              price: 150,
            },
            { name: "Sambar Rice", description: "Spicy and tangy", price: 100 },
          ],
        },
      },
    }),
    prisma.restaurant.create({
      data: {
        name: "Punjab Grill",
        country: "INDIA",
        menuItems: {
          create: [
            {
              name: "Butter Chicken",
              description: "North Indian dish",
              price: 300,
            },
            { name: "Naan", description: "Soft bread", price: 50 },
          ],
        },
      },
    }),
    prisma.restaurant.create({
      data: {
        name: "Delhi Chaat Bazaar",
        country: "INDIA",
        menuItems: {
          create: [
            {
              name: "Aloo Tikki",
              description: "Street food favorite",
              price: 70,
            },
            { name: "Pani Puri", description: "Crispy & tangy", price: 60 },
          ],
        },
      },
    }),
    prisma.restaurant.create({
      data: {
        name: "Hyderabad Spice",
        country: "INDIA",
        menuItems: {
          create: [
            { name: "Biryani", description: "Fragrant rice dish", price: 250 },
            {
              name: "Double Ka Meetha",
              description: "Sweet bread pudding",
              price: 120,
            },
          ],
        },
      },
    }),
  ]);

  await Promise.all([
    prisma.restaurant.create({
      data: {
        name: "Texas BBQ Co.",
        country: "AMERICA",
        menuItems: {
          create: [
            { name: "BBQ Ribs", description: "Smoky and tender", price: 550 },
            { name: "Cornbread", description: "Sweet side dish", price: 100 },
          ],
        },
      },
    }),
    prisma.restaurant.create({
      data: {
        name: "LA Burger Joint",
        country: "AMERICA",
        menuItems: {
          create: [
            {
              name: "Double Cheeseburger",
              description: "Big & juicy",
              price: 450,
            },
            { name: "Onion Rings", description: "Crispy rings", price: 120 },
          ],
        },
      },
    }),
    prisma.restaurant.create({
      data: {
        name: "Miami Tacos",
        country: "AMERICA",
        menuItems: {
          create: [
            {
              name: "Chicken Tacos",
              description: "Grilled and spicy",
              price: 300,
            },
            { name: "Churros", description: "Sweet and crunchy", price: 90 },
          ],
        },
      },
    }),
    prisma.restaurant.create({
      data: {
        name: "New York Pizza Co.",
        country: "AMERICA",
        menuItems: {
          create: [
            {
              name: "Margherita Pizza",
              description: "Classic NY slice",
              price: 400,
            },
            { name: "Garlic Bread", description: "Toasty side", price: 80 },
          ],
        },
      },
    }),
  ]);

  // Form Schema: login
  await prisma.formSchema.create({
    data: {
      name: "login",
      description: "Login form schema",
      fields: {
        create: [
          {
            name: "username",
            label: "Username",
            type: "TEXT",
            required: true,
            order: 1,
            placeholder: "Enter your username",
          },
          {
            name: "password",
            label: "Password",
            type: "PASSWORD",
            required: true,
            order: 2,
            placeholder: "Enter your password",
          },
        ],
      },
    },
  });
}

main()
  .then(() =>
    console.log("✅ Seed completed with multiple users and restaurants")
  )
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
