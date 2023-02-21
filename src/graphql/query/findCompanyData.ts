import { gql } from '../generated';

export const FIND_MANY_COMPANY_DATA = gql(/* GraphQL */ `
  query findCompanyData {
    findCompanyData {
      publicOfferingStartHour
      publicOfferingEndHour
      publicOfferingFinalHour
      marketStartHour
      marketEndHour
      voteStartHour
      voteEndHour
      voteFinalHour
      feeRatio
      incomeTaxRatio
      localIncomeTaxRatio
    }
  }
`);
