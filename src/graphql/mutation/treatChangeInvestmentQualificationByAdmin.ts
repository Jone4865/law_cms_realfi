import { gql } from '../generated/gql';

export const TREAT_CHANGE_INVESTMENT_QUILIFICATION_BY_ADMIN = gql(/* GraphQL */ `
  mutation treatChangeInvestmentQualificationByAdmin(
    $id: Int!
    $approveStatus: ApproveStatus!
    $reason: String
  ) {
    treatChangeInvestmentQualificationByAdmin(
      id: $id
      approveStatus: $approveStatus
      reason: $reason
    )
  }
`);
