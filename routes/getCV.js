import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getCV(req, res) {
  const userId = req.params.userId; // Extract from req.params

  try {
    const cv = await prisma.cv.findUnique({
      where: { userId },
    });
    if (cv) {
      res.status(200).json(cv); // Send the CV with a 200 status
    } else {
      res.status(404).json({ error: "CV not found" }); // Handle not found with a 404 status
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status
  } finally {
    await prisma.$disconnect();
  }
}
