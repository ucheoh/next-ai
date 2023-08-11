// import { revalidatePath } from "next/cache";


function createUrl(path: string) {
  return window.location.origin + path;
}

export async function updateEntry(id: string, content: string) {
  const res = await fetch(
    new Request(createUrl(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

export default async function createNewEntry() {

  const res = await fetch(
    new Request(createUrl("/api/journal"), {
      method: "POST",
    })
  );

  if (res.ok) {
    const data = await res.json();

    // console.log("About to revalidate /journal");
    // revalidatePath("");
    // console.log("/journal revalidation signal sent");

    return data;
  }
}

export async function askQuestion(question: string) {

  const res = await fetch(
    new Request(createUrl("/api/question"), {
      method: "POST",
      body: JSON.stringify({ question }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
}
