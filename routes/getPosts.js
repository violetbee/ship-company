import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getPosts(req, res) {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts); // Send the posts with a 200 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status
  } finally {
    await prisma.$disconnect();
  }
}
