import { prismaDb, connectToDb } from "@/app/util/prisma/helpers";
import { NextResponse } from "next/server";
import * as z from "zod";

//schema for validating user inputs NEED TO BE COMPLETED
const questionSchema = z.object({
  id: z.string().nullable(),
  creatorId: z.string().nullable()
});

export async function getQuestion(req: Request) {
  try {
    const bodyPromise = req.json();

    
    console.log(bodyPromise)
    const [body, _] = await Promise.all([bodyPromise, connectToDb()]);


    const { id, creatorId } = questionSchema.parse(body);
    
    
    const question = prismaDb.question.findFirst({
      where: (id) ? {id} : {creatorId}
    });
    
    await Promise.all([question]);
    return question
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  } finally {
    prismaDb.$disconnect();
  }
}
