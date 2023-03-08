import { gql } from '../generated';

export const FIND_MANY_PROJECT_BY_ADMIN = gql(/* GraphQL */ `
  query findManyProjectByAdmin(
    $take: Int!
    $skip: Int!
    $searchText: String!
    $isSold: Boolean!
    $publicOfferingStatus: PublicOfferingStatus
    $marketStatus: MarketStatus
    $voteStatus: VoteStatus
  ) {
    findManyProjectByAdmin(
      take: $take
      skip: $skip
      publicOfferingStatus: $publicOfferingStatus
      marketStatus: $marketStatus
      searchText: $searchText
      voteStatus: $voteStatus
      isSold: $isSold
    ) {
      projects {
        id
        name
        publicOfferingStatus
        marketStatus
        voteStatus
        totalPublicOfferingAmount
        publicOfferingPrice
        createdAt
        isVisible
        publicOfferingRatio
        currentPrice
        fluctuationRatio
      }
      totalCount
    }
  }
`);
