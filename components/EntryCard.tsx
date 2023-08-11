import { Entry } from "@/types/journal";

export default function EntryCard({ entry }: { entry: Entry }) {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="max-w-sm rounded overflow-hidden border border-black/50 ">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <p className="text-gray-700 text-xs">{date}</p>
          <div className="text-xl mb-2">Summary</div>
          <p className="text-gray-700 text-base">Mood</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </div>
    </div>
  );
}
