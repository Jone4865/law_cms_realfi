import { gql } from '../generated';

export const FIND_MANY_PROJECT_DIVIDEND_BY_ADMIN = gql(/* GraphQL */ `
  query findManyProjectDividendByAdmin($take: Int!, $skip: Int!, $projectId: Int!) {
    findManyProjectDividendByAdmin(take: $take, skip: $skip, projectId: $projectId) {
      totalCount
      projectDividends {
        id
        name
        closingDate
        operatingProfit
        dividendPerTabs
        dividendCount
        dividendAt
      }
    }
  }
`);
