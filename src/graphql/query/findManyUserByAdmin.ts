import { gql } from '../generated';

export const FIND_MANY_USERS_BY_ADMIN = gql(/* GraphQL */ `
  query findManyUserByAdmin($take: Int!, $skip: Int!) {
    findManyUserByAdmin(take: $take, skip: $skip) {
      totalCount
      users {
        email
        name
        phone
        createdAt
        possibleInvestmentAmount
        isExistAccount
        birth
      }
    }
  }
`);
