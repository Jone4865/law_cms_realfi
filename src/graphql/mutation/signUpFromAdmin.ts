import { gql } from '../generated';

export const SIGN_UP_FROM_ADMIN = gql(/* GraphQL */ `
  mutation signUpFromAdmin($email: String!, $password: String!, $name: String!) {
    signUpFromAdmin(email: $email, password: $password, name: $name) {
      email
      name
      otpSecret
      createdAt
      role
    }
  }
`);
