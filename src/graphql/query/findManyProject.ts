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
        isSold
        zip
        address
        addressDetail
        latitude
        longitude
        zoning
        mainPurpose
        grossFloorAreaMeter
        grossFloorAreaPyeong
        buildingCoverageRatio
        floorAreaRatio
        officialLandPrice
        completionDate
        lessee
        leaseStartedAt
        leaseEndedAt
        url
        tabsName
        totalPublicOfferingAmount
        publicOfferingPrice
        publicOfferingQuantity
        issuer
        publicOfferingStartedAt
        publicOfferingEndedAt
        allocationDate
        receivingDate
        listedDate
        currentPublicOfferingAmount
        currentPublicOfferingQuantity
        totalDailyVolume
        totalDailyTransactionAmount
        dividendPeriod
        createdAt
        signId
        projectId
        currentPrice
        fluctuation
        fluctuationRatio
        quantity
        projectFiles {
          id
          fileKind
          name
          fileName
        }
        dailyTransactionInfos {
          id
          standardPrice
          openPrice
          closePrice
          upperLimitPrice
          lowerLimitPrice
          dayHighPrice
          dayLowPrice
          fluctuation
          fluctuationRatio
          totalVolume
          totalTransactionAmount
          createdAt
        }
        dDay
      }
      totalCount
    }
  }
`);
