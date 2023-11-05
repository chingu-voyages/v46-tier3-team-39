import { hash } from "bcryptjs";
import { findUniqueByEmail } from "@/app/util/prisma/helpers";
import { connectToDb, prismaDb } from "@/app/util/prisma/connection";

import { NextResponse } from "next/server";
import * as z from "zod";
//schema for validating user inputs
const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z.string().nullable(),
  name: z.string(),
  provider: z.string(),
});
export async function createUser(req: Request) {
  try {
    const bodyPromise = req.json();
    const [body, _] = await Promise.all([bodyPromise, connectToDb()]);
    const { email, password, name, provider } = userSchema.parse(body);
    const user = await findUniqueByEmail(email, "userCredentials");
    if (user)
      return NextResponse.json({
        status: 409,
        user: null,
        message: "User with this email, already exists",
      });
    const doesUserDocExist = await findUniqueByEmail(email, "user");
    const newUserPromise = doesUserDocExist
      ? doesUserDocExist
      : prismaDb.user.create({
          data: {
            name,
            email,
            usersReached: 0,
            questionData: {
              generated: 0,
              answered: 0,
            },
            tags: [],
          },
        });
    let hashPasswordPromise = null;
    if (password) hashPasswordPromise = hash(password, 10);
    const [newUser, hashedPassword] = await Promise.all([
      newUserPromise,
      hashPasswordPromise,
    ]);
    await prismaDb.userCredentials.create({
      data: {
        userId: newUser.id,
        email,
        password: hashedPassword,
        provider,
      },
    });
    return NextResponse.json({
      newUser,
      message: "User created successfully",
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
