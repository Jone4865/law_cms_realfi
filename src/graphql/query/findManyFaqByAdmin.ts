import { gql } from '../generated';

export const FIND_MANY_FAQ_BY_ADMIN = gql(/* GraphQL */ `
  query findManyFaqByAdmin($take: Int!, $skip: Int!, $searchText: String!, $faqCategoryId: Int!) {
    findManyFaqByAdmin(
      take: $take
      skip: $skip
      searchText: $searchText
      faqCategoryId: $faqCategoryId
    ) {
      totalCount
      faqs {
        id
        question
        answer
        createdAt
        faqCategory {
          id
          name
        }
        admin {
          name
        }
      }
    }
  }
`);
