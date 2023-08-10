"use client";

import { Entry } from "@/types/journal";
import { updateEntry } from "@/utils/api";
import useAutosave from "@/hooks/useAutosave";
import { useState } from "react";

export default function Editor({ entry }: { entry: Entry }) {
  const [text, setText] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);
  // const [currentEntry, setEntry] = useState(entry);

  if (!analysis) return;
  const { mood, summary, color, subject, negative } = analysis;
  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];

  useAutosave({
    data: text,
    onSave: async (_text: string) => {
      setIsSaving(true);
      const { data } = await updateEntry(entry.id, _text);
      setAnalysis(data.analysis)
      setIsSaving(false);
    },
  });

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        {isSaving && <span className="loading loading-bars loading-lg"></span>}
        <textarea
          style={{ width: "-webkit-fill-available" }}
          className="h-screen p-6 text-xl bg-yellow-300 outline-none "
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        ></textarea>
      </div>
      <div className="border-l border-blue-10 ">
        <div className="px-6 py-4 " style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((data) => (
              <li
                className="px-6 py-4 flex items-center justify-between border-t border-black/20"
                key="{data.name}"
              >
                <span className="font-semibold">{data.name}:</span>{" "}
                <span>{data.value.toString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
