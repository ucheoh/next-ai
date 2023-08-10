import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import getUserByClerkID from "@/utils/auth";
import { revalidatePath } from "next/cache";
import analyze from "@/utils/ai";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { content } = await req.json();
  const user = await getUserByClerkID();

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(updatedEntry.content);

  const updated = await prisma.analysis.update({
    
    where: {
      entryId: updatedEntry.id
    },
    data: {
      ...(analysis)
    },
  })

  return NextResponse.json({ data: {...updated, analysis }});
}
