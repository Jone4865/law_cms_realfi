import { gql } from '../generated/gql';

export const CREATE_FAQ_BY_ADMIN = gql(/* GraphQL */ `
  mutation createFaqByAdmin($question: String!, $answer: String!, $faqCategoryId: Int!) {
    createFaqByAdmin(question: $question, answer: $answer, faqCategoryId: $faqCategoryId)
  }
`);
