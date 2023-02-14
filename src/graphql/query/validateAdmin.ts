import { gql } from '../generated';

export const VALIDATE_ADMIN = gql(/* GraphQL */ `
  query validateAdmin($email: String!, $password: String!) {
    validateAdmin(email: $email, password: $password)
  }
`);
