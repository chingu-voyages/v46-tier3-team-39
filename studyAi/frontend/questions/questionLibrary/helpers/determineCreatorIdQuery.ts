import { Session } from "next-auth";

export const determineCreatorIdQuery = (
  pageType: string,
  session: {
    status: string;
    data: Session | null;
  }
) => {
  return pageType === "user" && session.status === "authenticated"
    ? { equals: session.data?.user.id }
    : undefined;
};
