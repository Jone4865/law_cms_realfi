import { gql } from '../generated/gql';

export const CREATE_FAQ_BY_ADMIN = gql(/* GraphQL */ `
  mutation createFaqByAdmin($question: String!, $answer: String!, $faqCategoryId: Int!) {
    createFaqByAdmin(question: $question, answer: $answer, faqCategoryId: $faqCategoryId)
  }
`);

// // 요청 분기점
// const [createFaqByAdmin, {}] = useMutation(CREATE_FAQ_BY_ADMIN, {
//   onError: (error) => {
//     notification.error({ message: error.message });
//   },
//   onCompleted: (data) => {
//     console.log(data);
//   },
// });

// // 요청 코드
// createFaqByAdmin({
//   variables: {
//     question,
//     answer,
//     faqCategoryId,
//   },
// });
