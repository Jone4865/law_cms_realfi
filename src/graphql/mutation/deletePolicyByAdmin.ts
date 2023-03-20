import { gql } from '../generated';

export const DELETE_POLICY_BY_ADMIN = gql(/* GraphQL */ `
  mutation deletePolicyByAdmin($id: Int!) {
    deletePolicyByAdmin(id: $id)
  }
`);
