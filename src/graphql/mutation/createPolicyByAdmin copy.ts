import { gql } from '../generated/gql';

export const CREATE_POLICY_BY_ADMIN = gql(/* GraphQL */ `
  mutation projectIsVisibleToggleByAdmin($id: Int!) {
    projectIsVisibleToggleByAdmin(id: $id)
  }
`);
