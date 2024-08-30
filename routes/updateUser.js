import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function updateUser(req, res) {
  const userId = req.params.id; // Extract from req.params
  const { name, email } = req.body; // Extract from req.body

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });
    res.status(200).json(updatedUser); // Send the updated user with a 200 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status
  } finally {
    await prisma.$disconnect();
  }
}
