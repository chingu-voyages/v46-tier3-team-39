import generatePrompts from "../../util/openAI/openAI";
import { NextResponse } from "next/server";
import * as z from "zod";

//schema for validating user inputs
const questionSchema = z.object({
  creatorId: z.string(),
  type: z.string(),
  tags: z.array(z.string()),
  question: z.object({
    title: z.string(),
    description: z.string(),
  }),
  answer: z.object({
    answer: z.string(),
  }),
  likeCounter: z.object({
    likes: z.number(),
    dislikes: z.number(),
  }),
  generateAnother: z.boolean().default(false),
});

export async function generateQuestion(req: Request) {
  try {
    const bodyPromise = req.json();
    const [body] = await Promise.all([bodyPromise]);
    const { type, tags, question, answer } = questionSchema.parse(body);
    const questionType = (type === "mcq") ?  "multiple choice with four different potential answers" : "short answer";
    const prompt = `Ask me a question, ${questionType}, similar to this question: ${question.description} and from the following cetegories: ${tags}. Indicate which is the correct response, and Return your response in a JSON object, with the following format: {"description": "", "Correct": "", "Incorrect": ["", "", ""]}`;
    const model = "gpt-3.5-turbo";
    const newQuestion = await Promise.all([generatePrompts(model, prompt)]);

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