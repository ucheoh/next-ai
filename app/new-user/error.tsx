"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <h2>{error.message.toString()}</h2>
      <button onClick={() => redirect("/")}>Go home</button>
    </div>
  );
}
