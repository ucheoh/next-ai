// import { revalidatePath } from "next/cache";

function createUrl(path: string) {
  return window.location.origin + path;
}

export async function updateEntry(id: string, content: string) {
  console.log("getting ready to fetch");

  const res = await fetch(
    new Request(createUrl(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );

  console.log("res received");

  if (res.ok) {
    console.log("res ok");
    console.log(res);
    console.log("res.body", res.body);
    const data = await res.status;
    console.log("return data");
    return data;
  }

  console.log("res okay");
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
