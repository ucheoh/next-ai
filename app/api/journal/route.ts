import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import getUserByClerkID from "@/utils/auth";
import { revalidatePath } from "next/cache";
import analyze from "@/utils/ai";

export async function POST() {
  const user = await getUserByClerkID();

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write about your day",
    },
  });

  const analysis = await analyze(entry.content);
  if (!analysis) return;
   
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis,
    },
  });

  // revalidatePath("/journal")

  return NextResponse.json({ data: entry });
}
