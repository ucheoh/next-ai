import { NextResponse } from "next/server";
import getUserByClerkId from "@/utils/auth";
import prisma from "@/utils/db";
import { qa } from "@/utils/ai";
import { QAEntry } from "@/types/journal";

console.log("hello")

export async function POST(req: Request) {
  console.log("In the route file")
  console.log("Awaiting req.json")

  const { question } = await req.json();

  console.log("question", question)

  const user = await getUserByClerkId();

  console.log("user", user)

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  const answer = await qa(question, entries);

  return NextResponse.json({ data: answer });
}
