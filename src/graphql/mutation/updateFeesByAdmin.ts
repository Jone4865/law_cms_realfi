import { gql } from '../generated';

export const UPDATE_FEES_BY_ADMIN = gql(/* GraphQL */ `
  mutation updateFeesByAdmin(
    $feeRatio: String!
    $incomeTaxRatio: String!
    $localIncomeTaxRatio: String!
  ) {
    updateFeesByAdmin(
      feeRatio: $feeRatio
      incomeTaxRatio: $incomeTaxRatio
      localIncomeTaxRatio: $localIncomeTaxRatio
    )
  }
`);
