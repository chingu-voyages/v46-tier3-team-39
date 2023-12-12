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
} from "../../../../../../graphql/generated/graphql";
import { handleCursor } from "@/app/util/components/pagination/handleCursor";
export type FetchSubmissionProps<T, A> = {
  userId: string;
  questionId?: string;
  loading: boolean;
  addOrUpdateItems: (
    items: (T & { id: string })[],
    type: "ongoing" | "submitted",
    setCursor?: Dispatch<SetStateAction<string | null>>
  ) => A;
  cursor: string | null;
  setCursor: Dispatch<SetStateAction<string | null>>;
  setCursorAfterFetch?: boolean;
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

function fetchItems<T, A>({
  userId,
  questionId,
  addOrUpdateItems,
  cursor,
  setCursor,
  getSubmission,
  loading,
  setCursorAfterFetch = true,
}: FetchSubmissionProps<T, A>) {
  return async () => {
    if (loading) return;
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
    if (setCursorAfterFetch)
      handleCursor({ setCursor, newArr: newSubmissionArr });
    addOrUpdateItems(newSubmissionArr, "submitted", setCursor);
    return newSubmissionArr;
  };
}

export default fetchItems;
