import { connectToDb, prismaDb } from "@/app/util/prisma/helpers";
import { NextResponse } from "next/server";
export async function deleteUser(req: Request) {
  try {
    const bodyPromise = req.json();
    const [body, _] = await Promise.all([bodyPromise, connectToDb()]);
    const { userId } = body;
    //add verify token here
    const userCred = prismaDb.userCredentials.delete({
      where: {
        userId,
      },
    });
    const user = prismaDb.user.delete({
      where: {
        id: userId,
      },
    });
    await Promise.all([userCred, user]);
    return NextResponse.json({
      message: "User deleted successfully",
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
