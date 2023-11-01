import generatePrompts from "../../util/openAI/openAI";
import { NextResponse } from "next/server";
import * as z from "zod";

//schema for validating user inputs
const questionSchema = z.object({
  type: z.string(),
  tags: z.array(z.string()),
  question: z.string(),
  answer: z.string()
});

export async function generateQuestion(req: Request) {
  try {
    const bodyPromise = req.json();    
    const body = await bodyPromise;
    const { type, tags, question, answer } = questionSchema.parse(body);
    const questionType = (type === "mcq") ?  "multiple choice with four different potential answers" : ("checkbox") ? "with four different potential answers some correct and some incorrect" : "short answer";
    
    const prompt = `Ask me a question, ${questionType}, similar to this question: ${question} and from the following subjects: ${tags}. Indicate which is the correct response, and Return your response in a JSON object, with the following format: {"question": "", "correct": ["",...], "incorrect": ["",...]}`;
    const model = "gpt-3.5-turbo";

    const newQuestion = JSON.parse(await generatePrompts(model, prompt) || "");

    return NextResponse.json({
      newQuestion,
      message: `Question Generated Successfully`,
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
}