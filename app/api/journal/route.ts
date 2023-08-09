import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import getUserByClerkID from "@/utils/auth";
import { revalidatePath } from "next/cache";

export async function POST() {
  const user = await getUserByClerkID();

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write about your day",
    },
  });
  return NextResponse.json({ data: entry });
}
