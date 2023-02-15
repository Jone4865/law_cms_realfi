import { gql } from '../generated';

export const FIND_MANY_PROJECT = gql(/* GraphQL */ `
  query findManyProject(
    $take: Int!
    $skip: Int!
    $publicOfferingStatus: PublicOfferingStatus
    $marketStatus: MarketStatus
  ) {
    findManyProject(
      take: $take
      skip: $skip
      publicOfferingStatus: $publicOfferingStatus
      marketStatus: $marketStatus
    ) {
      projects {
        id
        name
        publicOfferingStatus
        marketStatus
        voteStatus
        totalPublicOfferingAmount
        publicOfferingPrice
        publicOfferingQuantity
        publicOfferingStartedAt
        publicOfferingEndedAt
        projectFiles {
          id
          fileKind
          name
          fileName
        }
        dailyTransactionInfos {
          standardPrice
          totalTransactionAmount
          totalVolume
          fluctuation
          fluctuationRatio
        }
        currentPrice
        fluctuation
        fluctuationRatio
        dDay
        url
      }
      totalCount
    }
  }
`);
