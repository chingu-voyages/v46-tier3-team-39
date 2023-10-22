import { connectToDb, prismaDb } from "@/app/util/prisma/helpers";
import { NextResponse } from "next/server";
import * as z from "zod";

//schema for validating user inputs NEED TO BE COMPLETED
const questionSchema = z.object({
  id: z.string()
});

export async function deleteQuestion(req: Request) {
  try {
    const bodyPromise = req.json();
    const [body, _] = await Promise.all([bodyPromise, connectToDb()]);
    const { id } = questionSchema.parse(body); 
    const question = prismaDb.question.delete({where: {id}});

    await Promise.all([question]);
    return NextResponse.json({
      message: "Question deleted successfully",
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
