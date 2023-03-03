import { gql } from '../generated';

export const UPDATE_POLICY_BY_ADMIN = gql(/* GraphQL */ `
  mutation updatePolicyByAdmin(
    $id: Int!
    $title: String!
    $content: String!
    $isRequired: Boolean!
    $policyCategoryIds: [Int!]!
  ) {
    updatePolicyByAdmin(
      id: $id
      title: $title
      content: $content
      isRequired: $isRequired
      policyCategoryIds: $policyCategoryIds
    )
  }
`);
