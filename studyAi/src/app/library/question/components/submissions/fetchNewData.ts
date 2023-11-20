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
        cursor: {
          id: cursor,
        },
        skip: cursor ? 1 : null,
        orderBy: {
          dateCreated: "desc" as SortOrder,
        },
      },
    };
    const { data: results } = await getSubmission(queryOptions);
    if (!results) {
      setCursor(null);
      return [];
    }
    const newData = addOrUpdateItems(
      results.questionSubmissions as QuestionSubmissionStoreSubmissionType[],
      "submitted"
    );
    if (results.questionSubmissions.length <= 0) {
      setCursor(null);
      return results.questionSubmissions;
    }
    //means we have new items to update
    const newArr = newData.submittedData.arr?.[questionId] || null;
    const newNextCursor = newArr?.[newArr.length - 1]?.id || null;
    setCursor(newNextCursor);
    return results.questionSubmissions;
  };
export default fetchItems