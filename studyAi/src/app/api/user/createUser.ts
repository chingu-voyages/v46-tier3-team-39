import { hash } from "bcryptjs";
import { prismaDb, findUniqueByEmail } from "@/app/util/prisma/helpers";
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
    const body = await req.json();
    const { email, password, name, provider } = userSchema.parse(body);
    const user = await findUniqueByEmail(email, "userCredentials");
    if (user)
      return NextResponse.json({
        status: 409,
        user: null,
        message: "User with this email, already exists",
      });
    const newUserPromise = prismaDb.user.create({
      data: {
        name,
        email,
        usersReached: 0,
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
  }
}
