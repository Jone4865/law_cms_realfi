import { gql } from '../generated';

export const UPDATE_DIVIDEND_PERIOD_BY_ADMIN = gql(/* GraphQL */ `
  mutation updateDividendPeriodByAdmin($id: Int!, $dividendPeriod: String!) {
    updateDividendPeriodByAdmin(id: $id, dividendPeriod: $dividendPeriod)
  }
`);
