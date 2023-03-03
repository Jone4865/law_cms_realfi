import { gql } from '../generated';

export const FIND_MANY_POLICY_CATEGORY = gql(/* GraphQL */ `
  query findManyPolicyCategory {
    findManyPolicyCategory {
      id
      name
    }
  }
`);
