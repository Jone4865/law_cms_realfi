import { gql } from '../generated';

export const PAY_DIVIDEND_BY_ADMIN = gql(/* GraphQL */ `
  mutation payDividendByAdmin($id: Int!) {
    payDividendByAdmin(id: $id)
  }
`);
