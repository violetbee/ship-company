import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function updateCV(req, res) {
  const userId = req.params.userId; // Extract from req.params
  const { content } = req.body; // Extract from req.body

  try {
    const updatedCV = await prisma.cv.update({
      where: { userId },
      data: { content },
    });
    res.status(200).json(updatedCV); // Send the updated CV with a 200 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status
  } finally {
    await prisma.$disconnect();
  }
}
