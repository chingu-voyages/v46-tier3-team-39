import { SortOrder } from "../../../../backend/gql/generated/graphql";
import { QuestionOrderByWithRelationInput } from "../../../../backend/gql/generated/graphql";
export const determineSortQuery = (sortValue: string, sortOrder: SortOrder) => {
  let sortObj: QuestionOrderByWithRelationInput | undefined = undefined;
  switch (sortValue) {
    case "date":
      sortObj = {};
      sortObj.dateCreated = sortOrder;
      break;
    case "likes":
      sortObj = {};
      sortObj.likeCounter = {};
      sortObj.likeCounter.likes = sortOrder;
      break;
    case "title":
      sortObj = {};
      sortObj.questionInfo = {};
      sortObj.questionInfo.title = sortOrder;
      break;
    default:
      break;
  }
  return sortObj;
};
