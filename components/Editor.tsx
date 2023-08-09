"use client";

import { Entry } from "@/types/journal";
import { updateEntry } from "@/utils/api";
import useAutosave from "@/components/useAutosave";
import { useState } from "react";

export default function Editor({ entry }: { entry: Entry }) {
  const [text, setText] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);
  // const [currentEntry, setEntry] = useState(entry);

  useAutosave({
    data: text,
    onSave: async (_text: string) => {
      setIsSaving(true);
      const updated = await updateEntry(entry.id, _text);
      setIsSaving(false);
    },
  });

  return (
    <div className="h-full">
      {isSaving && <span className="loading loading-bars loading-lg"></span>}
      <textarea
      style={{width: '-webkit-fill-available' }}
        className="h-screen p-6 text-xl bg-yellow-300 outline-none "
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
      ></textarea>
    </div>
  );
}
