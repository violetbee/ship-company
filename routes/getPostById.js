import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getPostById(req, res) {
  const postId = req.params.id; // Extract from req.params

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (post) {
      res.status(200).json(post); // Send the post with a 200 status
    } else {
      res.status(404).json({ error: "Post not found" }); // Handle not found with a 404 status
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status
  } finally {
    await prisma.$disconnect();
  }
}
