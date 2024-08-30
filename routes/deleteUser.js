import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function deleteUser(req, res) {
  const userId = req.params.id; // Extract from req.params

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(204).json({ message: "User deleted" }); // Send back a 204 status with a message
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with res
  } finally {
    await prisma.$disconnect();
  }
}
