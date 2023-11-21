import {
  findUniqueByEmail,
} from "@/app/util/prisma/helpers";
import { connectToDb, prismaDb } from "@/app/util/prisma/connection";
import { Profile, Account } from "next-auth";

export const addCredDoc = async ({
  profile,
  account,
  isNewUser,
}: {
  account: Account | null;
  profile?: Profile | undefined;
  isNewUser?: boolean | undefined;
}) => {
  if (!isNewUser) return;
  //procced only if new user
  if (!profile) return;
  //for Oauth provider mapping to db
  try {
    const { email, name } = profile;
    if (!email || !name) return;
    await connectToDb();
    const [user, userDoc] = await Promise.all([
      findUniqueByEmail(email, "userCredential"),
      findUniqueByEmail(email, "user"),
    ]);
    if (account && account.userId && !user)
      return await prismaDb.userCredential.create({
        data: {
          userId: account.userId,
          email,
          provider: "oauth",
        },
      });
    //this only occurs when oauth is typically used,
    //since sign with email and pw already
    //has the cred file created
    if (userDoc && !user)
      return await prismaDb.userCredential.create({
        data: {
          userId: userDoc.id,
          email,
          provider: "oauth",
        },
      });
  } catch (err) {
    console.error(err, 'could not create user document');
  } finally {
    prismaDb.$disconnect();
  }
};
