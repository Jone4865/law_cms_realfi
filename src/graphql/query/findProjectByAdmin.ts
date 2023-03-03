import { gql } from '../generated';

export const FIND_PROJECT_BY_ADMIN = gql(/* GraphQL */ `
  query findProjectByAdmin($id: Int!) {
    findProjectByAdmin(id: $id) {
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
      projectFiles {
        id
        fileKind
        name
        fileName
      }
      dDay
    }
  }
`);
