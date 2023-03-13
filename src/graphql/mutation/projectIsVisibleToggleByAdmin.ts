import { gql } from '../generated';

export const PROJECT_IS_VISIBLE_TOGGLE_BY_ADMIN = gql(/* GraphQL */ `
  mutation projectIsVisibleToggleByAdmin($id: Int!) {
    projectIsVisibleToggleByAdmin(id: $id)
  }
`);
