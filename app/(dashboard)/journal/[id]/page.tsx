import Editor from "@/components/Editor";
import getUserByClerkID from "@/utils/auth";
import prisma from "@/utils/db"

interface IParamsProps {
  id: string;
}

async function getEntry(id: string) {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      }
    }
  })
  return entry;
}

export default async function EntryPage({ params }: { params: IParamsProps }) {
  const entry = await getEntry(params.id);
  if (!entry) return;
  return (
    <div className="h-full w-full">
      <Editor entry={entry}/>
    </div>
  );
}
