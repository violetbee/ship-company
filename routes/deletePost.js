import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function deletePost(req, res) {
  const postId = req.params.id; // Extract from req.params

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
    res.status(204).json({ message: "Post deleted" }); // Send back a 204 status with a message
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with res
  } finally {
    await prisma.$disconnect();
  }
}
