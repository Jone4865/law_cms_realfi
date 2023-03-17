import { gql } from '../generated/gql';

export const VERIFY_MARKET_STATUS_IS_UNLISTED = gql(/* GraphQL */ `
  mutation verifyMarketStatusIsUnlisted {
    verifyMarketStatusIsUnlisted {
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
    }
  }
`);
