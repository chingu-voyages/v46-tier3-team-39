import main from "@/gql/graphql";
import { NextApiRequest, NextApiResponse } from "next";
export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await main(req, res);
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return await main(req, res);
}
