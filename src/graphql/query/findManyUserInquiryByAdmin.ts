import { gql } from '../generated';

export const FIND_MANY_USER_INQUIRY_BY_ADMIN = gql(/* GraphQL */ `
  query findManyUserInquiryByAdmin(
    $take: Int!
    $skip: Int!
    $searchText: String!
    $userInquiryCategoryId: Int
    $email: String
  ) {
    findManyUserInquiryByAdmin(
      take: $take
      skip: $skip
      searchText: $searchText
      userInquiryCategoryId: $userInquiryCategoryId
      email: $email
    ) {
      totalCount
      userInquiries {
        id
        title
        content
        reply
        repliedAt
        createdAt
        userInquiryCategory {
          id
          name
        }
        admin {
          name
        }
        user {
          name
          phone
        }
      }
    }
  }
`);
