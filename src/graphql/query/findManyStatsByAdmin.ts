import { gql } from '../generated';

export const FIND_MANY_STATS_BY_ADMIN = gql(/* GraphQL */ `
  query findManyStatsByAdmin {
    findManyStatsByAdmin {
      userCount {
        day
        result
      }
    }
  }
`);
