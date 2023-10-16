import ExecuteQuery from "@/app/mssql/db";

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log(await ExecuteQuery("select * from dbo.users"));

  return NextResponse.json({ message: "This is a GET request." });
}

// export async function POST(req: NextRequest, res: NextResponse) {
//   console.log(await ExecuteQuery("select * from dbo.users"));

//   return NextResponse.json({ message: "This is a GET request." });
// }
