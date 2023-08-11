"use client";

import React, { useState } from "react";
import { askQuestion } from "@/utils/api";

export default function Question() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const answer = await askQuestion(question);
    setLoading(false);
    setAnswer(answer);
    // setQuestion("");
  };

  return (
    <div className="px-6 py-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="question" className="block">
          What's your question?
        </label>
        <input
          disabled={loading}
          onChange={onChange}
          value={question}
          type="text"
          placeholder="Ask a question"
          className="border border-black/20 px-1 py-2 text-sm"
          name="question"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-300 px-6 py-2 rounded-sm"
        >
          Submit
        </button>
      </form>
      {loading && <div>Loading</div>}
      {answer && <div>{answer}</div>}
    </div>
  );
}
