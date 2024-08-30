import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function createUser(req, res) {
  const { name, email } = req.body; // Extract from req.body

  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(newUser); // Use res to send back the response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with res
  } finally {
    await prisma.$disconnect();
  }
}
