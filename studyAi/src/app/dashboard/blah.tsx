"use client"
import { useQuery } from "@apollo/client";
import { gql } from "../../../graphql/generated";

const QuestionQueryById = gql(`
  query GetFullQuestion($id: String) {
    question(where: { id: $id }) {
      id
      creatorId
      questionType
      tags
      questionInfo {
        title
        description
        options
      }
      likeCounter {
        likes
        dislikes
      }
    }
  }
`);

const Blah = () => {
  
  const query = useQuery(QuestionQueryById, {variables: {id: "6547321ece45c9cdfba29c5e"}})

  return (
    <div className="w-2/6">
     Hello
    </div>
  );
};
export default Blah;