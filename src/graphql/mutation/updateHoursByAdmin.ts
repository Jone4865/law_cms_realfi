import { gql } from '../generated/gql';

export const UPDATE_HOURS_BY_ADMIN = gql(/* GraphQL */ `
  mutation updateHoursByAdmin(
    $publicOfferingStartHour: String!
    $publicOfferingEndHour: String!
    $publicOfferingFinalHour: String!
    $marketStartHour: String!
    $marketEndHour: String!
    $voteStartHour: String!
    $voteEndHour: String!
    $voteFinalHour: String!
  ) {
    updateHoursByAdmin(
      publicOfferingStartHour: $publicOfferingStartHour
      publicOfferingEndHour: $publicOfferingEndHour
      publicOfferingFinalHour: $publicOfferingFinalHour
      marketStartHour: $marketStartHour
      marketEndHour: $marketEndHour
      voteStartHour: $voteStartHour
      voteEndHour: $voteEndHour
      voteFinalHour: $voteFinalHour
    )
  }
`);
