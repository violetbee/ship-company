import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function updatePost(req, res) {
  const postId = req.params.id; // Extract from req.params
  const { name } = req.body; // Extract from req.body

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { name },
    });
    res.status(200).json(updatedPost); // Send the updated post with a 200 status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status
  } finally {
    await prisma.$disconnect();
  }
}
