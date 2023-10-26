// import { connectToDb, prismaDb } from "@/app/util/prisma/connection";
// import { NextResponse } from "next/server";
// import * as z from "zod";

// //schema for validating user inputs
// const questionSchema = z.object({
//   id: z.string().min(1, "Id is required"),
//   type: z.string().nullable(),
//   tags: z.array(z.string()).nullable(),
//   question: z
//     .object({
//       title: z.string(),
//       description: z.string(),
//     })
//     .nullable(),
//   answer: z
//     .object({
//       answer: z.string(),
//     })
//     .nullable(),
//   likeCounter: z
//     .object({
//       likes: z.number(),
//       dislikes: z.number(),
//     })
//     .nullable(),
// });

// export async function updateQuestion(req: Request) {
//   try {
//     const bodyPromise = req.json();
//     const [body, _] = await Promise.all([bodyPromise, connectToDb()]);
//     const { id, type, tags, question, answer, likeCounter } =
//       questionSchema.parse(body);
//     const questionPromise = await prismaDb.question.update({
//       where: {
//         id,
//       },
//       data: {
//         type,
//         tags,
//         question,
//         answer,
//         likeCounter,
//       },
//     });

//     await Promise.all([questionPromise]);
//     return NextResponse.json({
//       message: "Question updated successfully",
//       status: 201,
//     });
//   } catch (err) {
//     return NextResponse.json({
//       status: 500,
//       message: "Something went wrong",
//     });
//   } finally {
//     prismaDb.$disconnect();
//   }
// }
