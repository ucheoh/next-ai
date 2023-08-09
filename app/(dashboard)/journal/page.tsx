import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import prisma from "@/utils/db";
import getUserByClerkID from "@/utils/auth";
import NewEntryCard from "@/components/NewEntryCard";
import EntryCard from "@/components/EntryCard";

async function getEntries() {
  const { userId } = await auth();

  if (!userId) return null;

  const user = await getUserByClerkID();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return entries;
}

export default async function JournalPage() {
  const entries = await getEntries();
  return (
    <main className="">
      <div className="block">
        <h1 className="mx-6 text-5xl mt-4 mb-6">Journals</h1>
      </div>

      <ul>
        <div className="mx-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 l:grid-cols-4 2xl:grid-cols-5 gap-4">
          <NewEntryCard />
          {entries?.map((entry) => (
            <li key={entry.id}>
              <Link href={`/journal/${entry.id}`}>
                <EntryCard entry={entry} />
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </main>
  );
}
