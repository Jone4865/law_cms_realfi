import { gql } from '../generated';

export const FIND_PROFILE_FROM_ADMIN = gql(/* GraphQL */ `
  query findProfileFromAdmin {
    findProfileFromAdmin {
      email
      name
      createdAt
      role
    }
  }
`);
