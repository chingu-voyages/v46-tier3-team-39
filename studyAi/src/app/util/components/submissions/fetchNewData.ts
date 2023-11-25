import { Dispatch, SetStateAction } from "react";
import { LazyQueryExecFunction } from "@apollo/client";
import {
  DateTimeFilter,
  InputMaybe,
  QuestionSubmissionOrderByWithRelationInput,
  QueryFullQuestionSubmissionsQuery,
  QuestionSubmissionWhereUniqueInput,
  SortOrder,
  StringFilter,
  Exact,
} from "../../../../../graphql/generated/graphql";
export type FetchSubmissionProps<T, A> = {
  userId: string;
  questionId?: string;
  addOrUpdateItems: (
    items: (T & { id: string })[],
    type: "ongoing" | "submitted"
  ) => A;
  cursor: string | null;
  setCursor: Dispatch<SetStateAction<string | null>>;
  getSubmission: LazyQueryExecFunction<
    QueryFullQuestionSubmissionsQuery,
    Exact<{
      userId: string;
      dateQuery?: InputMaybe<DateTimeFilter>;
      questionId?: InputMaybe<StringFilter>;
      orderBy?: InputMaybe<
        | QuestionSubmissionOrderByWithRelationInput
        | QuestionSubmissionOrderByWithRelationInput[]
      >;
      cursor?: InputMaybe<QuestionSubmissionWhereUniqueInput>;
      skip?: InputMaybe<number>;
    }>
  >;
};
const fetchItems =
  <T, A>({
    userId,
    questionId,
    addOrUpdateItems,
    cursor,
    setCursor,
    getSubmission,
  }: FetchSubmissionProps<T, A>) =>
  async () => {
    const queryOptions = {
      variables: {
        questionId:
          typeof questionId === "string" ? { equals: questionId } : undefined,
        userId: userId,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        skip: cursor ? 1 : 0,
        orderBy: {
          dateCreated: SortOrder.Desc,
        },
      },
    };
    const { data: results } = await getSubmission(queryOptions);
    if (!results) {
      setCursor(null);
      return [];
    }
    const newSubmissionArr = results.questionSubmissions as unknown as (T & {
      id: string;
    })[];
    if (newSubmissionArr.length <= 0) {
      setCursor(null);
      return newSubmissionArr;
    }
    //means we have new items to update
    const newNextCursor = newSubmissionArr[newSubmissionArr.length - 1].id;
    setCursor(newNextCursor || null);
    addOrUpdateItems(newSubmissionArr, "submitted");
    return newSubmissionArr;
  };
export default fetchItems;
