import { gql } from '../generated';

export const FIND_MANY_ADMIN_BY_ADMIN = gql(/* GraphQL */ `
  query findManyAdminByAdmin($take: Int!, $skip: Int!) {
    findManyAdminByAdmin(take: $take, skip: $skip) {
      totalCount
      admins {
        name
        email
        otpSecret
        createdAt
      }
    }
  }
`);
