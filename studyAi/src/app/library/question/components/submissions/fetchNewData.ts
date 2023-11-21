import { Dispatch, SetStateAction } from "react";
import {
  QuestionSubmissionStoreSubmissionType,
  QuestionSubmissionsData,
} from "@/app/stores/questionSubmissionsStore";
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
const fetchItems =
  ({
    userId,
    questionId,
    addOrUpdateItems,
    cursor,
    setCursor,
    getSubmission,
  }: {
    userId: string;
    questionId?: string;
    addOrUpdateItems: (
      items: QuestionSubmissionStoreSubmissionType[],
      type: "ongoing" | "submitted"
    ) => QuestionSubmissionsData;
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
  }) =>
  async () => {
    if (!questionId) return;
    const queryOptions = {
      variables: {
        questionId: { equals: questionId === "string" ? questionId : "" },
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
    const newSubmissionArr =
      results.questionSubmissions as QuestionSubmissionStoreSubmissionType[];
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
