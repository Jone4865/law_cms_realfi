import { gql } from '../generated';

export const DELETE_FAQ_BY_ADMIN = gql(/* GraphQL */ `
  mutation deleteFaqByAdmin($id: Int!) {
    deleteFaqByAdmin(id: $id)
  }
`);
