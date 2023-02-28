import { gql } from '../generated';

export const CREATE_PROJECT_DIVIDEND_BY_ADMIN = gql(/* GraphQL */ `
  mutation createProjectDividendByAdmin(
    $projectId: Int!
    $name: String!
    $closingDate: Date!
    $operatingProfit: String
  ) {
    createProjectDividendByAdmin(
      projectId: $projectId
      name: $name
      closingDate: $closingDate
      operatingProfit: $operatingProfit
    )
  }
`);
