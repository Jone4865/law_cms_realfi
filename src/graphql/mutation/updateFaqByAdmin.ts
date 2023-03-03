import { gql } from '../generated/gql';

export const UPDATE_FAQ_BY_ADMIN = gql(/* GraphQL */ `
  mutation updateFaqByAdmin($id: Int!, $question: String!, $answer: String!, $faqCategoryId: Int!) {
    updateFaqByAdmin(id: $id, question: $question, answer: $answer, faqCategoryId: $faqCategoryId)
  }
`);
