import { gql } from '../generated';

export const SIGN_IN_FROM_ADMIN = gql(/* GraphQL */ `
  query signInFromAdmin($email: String!, $password: String!, $code: String!) {
    signInFromAdmin(email: $email, password: $password, code: $code) {
      accessToken
      refreshToken
    }
  }
`);
