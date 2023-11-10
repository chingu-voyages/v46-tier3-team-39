import generatePrompts from "../../util/openAI/openAI";
import { NextResponse } from "next/server";
import * as z from "zod";

//schema for validating user inputs
const questionSchema = z.object({
  type: z.string(),
  tags: z.array(z.string()),
  question: z.string(),
  numberOfOptions: z.number()
});

export async function generateQuestion(req: Request) {
  try {
    const bodyPromise = req.json();
    const body = await bodyPromise;
    const { type, tags, question, numberOfOptions } = questionSchema.parse(body);
    const questionType = (type === "mcq") ?  `multiple choice with ${numberOfOptions} different potential answers` : ("checkbox") ? `with ${numberOfOptions} different potential answers some correct and some incorrect` : "short answer";
    
    const prompt = `Ask me a question, ${questionType}, similar to this question: ${question} and from the following subjects: ${tags}. Indicate which is the correct response, and Return your response in a JSON object, with the following format: {"question": "", "correct": ["",...], "incorrect": ["",...]}`;
    const model = "gpt-3.5-turbo";
    const questionGenerated = await generatePrompts(model, prompt) || "";
    const newQuestion = JSON.parse(questionGenerated);
    newQuestion.options = [...newQuestion.correct, ...newQuestion.incorrect];

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