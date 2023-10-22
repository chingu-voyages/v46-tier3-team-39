import { prismaDb, connectToDb } from "@/app/util/prisma/helpers";
import generatePrompts from "@/app/util/openAI/openAI";
import { NextResponse } from "next/server";
import * as z from "zod";

//schema for validating user inputs
const questionSchema = z.object({
  creatorId: z.string(),
  type: z.string(),
  tags: z.array(z.string()),
  question: z.object({
    title: z.string(),
    description: z.string()
  }),
  answer: z.object({
    answer: z.string(),
  }),
  likeCounter: z.object({
    likes: z.number(),
    dislikes: z.number()
  }),
  generateAnother: z.boolean().default(false)
});

export async function createQuestion(req: Request) {
  try {
    const bodyPromise = req.json();
    const [body, _] = await Promise.all([bodyPromise, connectToDb()]);
    const { creatorId, type, tags, question, answer, likeCounter, generateAnother } = questionSchema.parse(body);
    let newQuestion;

    if (generateAnother) {
      const prompt = "";
      const model = "gpt-3.5-turbo";
      newQuestion = generatePrompts(model, prompt);
    }
    else {
      const newQuestionPromise = prismaDb.question.create({
        data: {
          creatorId,
          type,
          tags,
          question,
          answer,
          likeCounter
        },
      });     
      newQuestion = await Promise.all([newQuestionPromise]);
    }

    return NextResponse.json({
      newQuestion,
      message: `Question ${(generateAnother) ? 'Generated' : 'Added'} Successfully`,
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  } finally {
    prismaDb.$disconnect();
  }
}
