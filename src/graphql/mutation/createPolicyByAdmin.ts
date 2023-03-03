import { gql } from '../generated/gql';

export const CREATE_POLICY_BY_ADMIN = gql(/* GraphQL */ `
  mutation createPolicyByAdmin(
    $title: String!
    $content: String!
    $isRequired: Boolean!
    $policyCategoryIds: [Int!]!
  ) {
    createPolicyByAdmin(
      title: $title
      content: $content
      isRequired: $isRequired
      policyCategoryIds: $policyCategoryIds
    )
  }
`);
