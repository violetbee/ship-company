import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function deleteJobListing(req, res) {
  const jobId = req.params.id; // Extract from req.params

  try {
    await prisma.jobListing.delete({
      where: { id: jobId },
    });
    res.status(204).json({ message: "Job listing deleted" }); // Send back a 204 status with a message
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with res
  } finally {
    await prisma.$disconnect();
  }
}
