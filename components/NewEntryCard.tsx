"use client";

import createNewEntry from "@/utils/api";
import { useRouter } from "next/navigation";

export default function NewEntryCard() {
  const router = useRouter();

  async function handleClick() {
    const { data } = await createNewEntry();

    router.push(`/journal/${data.id}`);
  }

  return (
    <div
      className="cursor-pointer max-w-sm rounded overflow-hidden border border-black/50"
      onClick={handleClick}
    >
      <div className=" px-6 py-4 ">
        <div className="text-3xl mb-2">New Entry</div>
        <br />
        {/* <p className="text-gray-700 text-6xl text-center">➕</p> */}
      </div>
    </div>
  );
}
