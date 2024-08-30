import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function createJobListing(req, res) {
  const { title, description, userId } = req.body; // Extract from req.body instead of event.body

  try {
    const newJobListing = await prisma.jobListing.create({
      data: { title, description, userId },
    });
    res.status(201).json(newJobListing); // Use res to send back the response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with res
  } finally {
    await prisma.$disconnect();
  }
}
