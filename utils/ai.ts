import { OpenAI } from "langchain/llms/openai";

export default async function analyze(prompt: any) {
  const model = new OpenAI({temperature: 0,  modelName: "gpt-3.5-turbo"})
  const res = await model.call(prompt)
  console.log(res)
}
