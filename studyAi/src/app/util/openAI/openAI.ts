import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function generatePrompts(model: string, prompt: string) {
  
  const response = await openai.createCompletion({
    model,
    prompt,
    max_tokens: 300,
    temperature: 0
  });

  return response.data;
}