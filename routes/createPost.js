import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function createPost(req, res) {
  const { name, createdById } = req.body; // Extract from req.body

  try {
    const newPost = await prisma.post.create({
      data: { name, createdById },
    });
    res.status(201).json(newPost); // Use res to send back the response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with res
  } finally {
    await prisma.$disconnect();
  }
}
