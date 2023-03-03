import { gql } from '../generated';

export const FIND_MANY_POLICY_BY_ADMIN = gql(/* GraphQL */ `
  query findManyPolicyByAdmin($take: Int!, $skip: Int!) {
    findManyPolicyByAdmin(take: $take, skip: $skip) {
      totalCount
      policies {
        id
        title
        isRequired
        admin {
          name
        }
        policyCategories {
          name
        }
      }
    }
  }
`);
