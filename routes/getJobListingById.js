import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getJobListingById(req, res) {
  const jobId = req.params.id; // Extract from req.params

  try {
    const jobListing = await prisma.jobListing.findUnique({
      where: { id: jobId },
    });
    if (jobListing) {
      res.status(200).json(jobListing); // Send the job listing with a 200 status
    } else {
      res.status(404).json({ error: "Job listing not found" }); // Handle not found with a 404 status
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status
  } finally {
    await prisma.$disconnect();
  }
}
