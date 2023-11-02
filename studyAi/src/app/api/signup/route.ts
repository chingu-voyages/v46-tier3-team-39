import ExecuteQuery from "@/app/mssql/db";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json();
    const { name, email, password } = body;

    console.log('name, email, password: ' + name, email, password)

    if (!name || !email || !password) {
        return new NextResponse("Missing Fields", { status: 400 });
      }

      const foundUser = null;
    //   await ExecuteQuery(`SELECT name, email, password FROM dbo.users
    //         WHERE email = ${email}`);
      if (foundUser) {

        return new NextResponse("User already in database", { status: 404 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await ExecuteQuery(`INSERT INTO dbo.users (name) VALUES ('${name}');`);

//   console.log(await ExecuteQuery("select * from dbo.users"));

  return NextResponse.json({status: 200, message: "Successfully Signed Up"});
}
