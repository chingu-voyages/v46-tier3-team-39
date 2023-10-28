"use client";
import { useQuery } from "@apollo/client";
import { Question } from "../../../../../../prisma/generated/type-graphql";
import { gql } from "@apollo/client";
import { useParams } from "next/navigation";
// const getAnswerById = gql`
//   query Question($id: String) {
//     question(where: { id: $id }) {
//       id
//       answer {
//         answer
//       }
//     }
//   }
// `;
const AnswerContainer = ({ height }: { height?: string | number }) => {
  // const params = useParams()
  // const questionId = params?.id
  // const {
  //   loading,
  //   error,
  //   data: queryData,
  // } = useQuery(getAnswerById, {
  //   variables: { id: questionId},
  // });
  // console.log(loading, error, queryData);
  return <></>;
};
export default AnswerContainer;
