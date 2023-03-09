import { gql } from '../generated';

export const FIND_MANY_DIVIDEND_IN_USER_BY_ADMIN = gql(/* GraphQL */ `
  query findManyDividendInUserByAdmin($take: Int!, $skip: Int!, $email: String!, $projectId: Int!) {
    findManyDividendInUserByAdmin(take: $take, skip: $skip, email: $email, projectId: $projectId) {
      totalCount
      project {
        name
      }
      dividends {
        id
        tabsCount
        tax
        calcDividend
        projectDividend {
          name
          dividendAt
        }
      }
      sum
    }
  }
`);
