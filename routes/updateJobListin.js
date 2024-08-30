import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function updateJobListing(req, res) {
  const jobId = req.params.id; // Extract from req.params
  const { title, description } = req.body; // Extract from req.body

  try {
    const updatedJobListing = await prisma.jobListing.update({
      where: { id: jobId },
      data: { title, description },
    });
    res.status(200).json(updatedJobListing); // Send the updated job listing with a 200 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status
  } finally {
    await prisma.$disconnect();
  }
}
