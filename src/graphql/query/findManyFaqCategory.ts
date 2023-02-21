import { gql } from '../generated';

export const FIND_MANY_FAQ_CATEGORY = gql(/* GraphQL */ `
  query findManyFaqCategory {
    findManyFaqCategory {
      id
      name
    }
  }
`);
