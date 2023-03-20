import { gql } from '../generated';

export const DELETE_ADMIN = gql(/* GraphQL */ `
  mutation deleteAdmin($email: String!) {
    deleteAdmin(email: $email)
  }
`);
