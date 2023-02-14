import { gql } from '../generated/gql';

export const UPDATE_FAQ_BY_ADMIN = gql(/* GraphQL */ `
  mutation updateFaqByAdmin($id: Int!, $question: String!, $answer: String!, $faqCategoryId: Int!) {
    updateFaqByAdmin(id: $id, question: $question, answer: $answer, faqCategoryId: $faqCategoryId)
  }
`);

// // 요청 분기점
// const [updateFaqByAdmin, {}] = useMutation(UPDATE_FAQ_BY_ADMIN, {
//   onError: (error) => {
//     notification.error({ message: error.message });
//   },
//   onCompleted: (data) => {
//     console.log(data);
//   },
// });

// // 요청 코드
//   updateFaqByAdmin({
//     variables: {
//       id,
//       question,
//       answer,
//       faqCategoryId,
//     },
//   });
