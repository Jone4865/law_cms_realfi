import { gql } from '../generated';

export const DELETE_OTP_SECRET_BY_ADMIN = gql(/* GraphQL */ `
  mutation deleteOtpSecretByAdmin($email: String!) {
    deleteOtpSecretByAdmin(email: $email)
  }
`);
