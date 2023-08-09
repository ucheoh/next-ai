import Editor from "@/components/Editor";
import getUserByClerkID from "@/utils/auth";
import prisma from "@/utils/db";

interface IParamsProps {
  id: string;
}

async function getEntry(id: string) {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  });
  return entry;
}

export default async function EntryPage({ params }: { params: IParamsProps }) {
  const entry = await getEntry(params.id);
  const analysisData = [
    { name: "Summary", value: "Test" },
    { name: "Subject", value: "Testing" },
    { name: "Mood", value: "Mood" },
    { name: "Negative", value: false },
  ];
  if (!entry) return;
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-blue-10">
        <div className="bg-blue-300 px-6 py-4 ">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
        <ul>
          {analysisData.map((data) => (
            <li className="px-6 py-4 flex items-center justify-between border-t border-black/20" key="{data.name}">
              <span className="font-semibold">{data.name}:</span> <span>{data.value.toString()}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>

    </div>
  );
}
