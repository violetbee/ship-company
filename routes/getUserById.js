import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getUserById(req, res) {
  const userId = req.params.id; // Extract from req.params

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      res.status(200).json(user); // Send the user with a 200 status
    } else {
      res.status(404).json({ error: "User not found" }); // Handle not found with a 404 status
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status
  } finally {
    await prisma.$disconnect();
  }
}
