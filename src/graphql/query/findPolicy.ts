import { gql } from '../generated';

export const FIND_POLICY = gql(/* GraphQL */ `
  query findPolicy($id: Int!) {
    findPolicy(id: $id) {
      id
      title
      content
      isRequired
      createdAt
    }
  }
`);
