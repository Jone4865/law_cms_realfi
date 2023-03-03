import { gql } from '../generated';

export const FIND_MANY_DIVIDEND_ADMIN = gql(/* GraphQL */ `
  query findManyDividendByAdmin(
    $take: Int!
    $skip: Int!
    $searchText: String!
    $projectDividendId: Int!
  ) {
    findManyDividendByAdmin(
      take: $take
      skip: $skip
      searchText: $searchText
      projectDividendId: $projectDividendId
    ) {
      totalCount
      dividends {
        id
        tabsCount
        tax
        calcDividend
        name
        phone
      }
    }
  }
`);
