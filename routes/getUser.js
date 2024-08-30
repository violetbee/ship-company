import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users); // Send the users with a 200 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status
  } finally {
    await prisma.$disconnect();
  }
}
