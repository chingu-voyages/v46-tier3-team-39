import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function generatePrompts(model: string, prompt: string) {
  
  const response = await openai.createChatCompletion({
    model,
    messages: [{role: "user", content: prompt}]
  });

  return response.data.choices[0].message.content;
}