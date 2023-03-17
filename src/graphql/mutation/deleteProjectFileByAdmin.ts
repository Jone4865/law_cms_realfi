import { gql } from '../generated';

export const DELETE_PROJECT_FILE_BY_ADMIN = gql(/* GraphQL */ `
  mutation deleteProjectFileByAdmin($id: Int!) {
    deleteProjectFileByAdmin(id: $id)
  }
`);
