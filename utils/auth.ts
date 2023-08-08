import { auth } from "@clerk/nextjs";
import prisma from "./db";

export async function getUserByClerkID() {
  const { userId } = await auth();
  return await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  });
}
