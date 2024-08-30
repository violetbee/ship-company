import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getJobListings(req, res) {
  try {
    const jobListings = await prisma.jobListing.findMany();
    res.status(200).json(jobListings); // Send job listings with a 200 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status
  } finally {
    await prisma.$disconnect();
  }
}
