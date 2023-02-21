import { gql } from '../generated';

export const CREATE_PROJECT_BY_ADMIN = gql(/* GraphQL */ `
  mutation createProjectByAdmin(
    $name: String!
    $zip: String!
    $address: String!
    $addressDetail: String!
    $latitude: String!
    $longitude: String!
    $zoning: String!
    $mainPurpose: String!
    $grossFloorAreaMeter: String!
    $grossFloorAreaPyeong: String!
    $buildingCoverageRatio: String!
    $floorAreaRatio: String!
    $officialLandPrice: String!
    $completionDate: Date!
    $lessee: String
    $leaseStartedAt: Date
    $leaseEndedAt: Date
    $url: String
    $tabsName: String!
    $totalPublicOfferingAmount: String!
    $publicOfferingPrice: String!
    $publicOfferingQuantity: Int!
    $issuer: String!
    $publicOfferingStartedAt: Date!
    $publicOfferingEndedAt: Date!
    $allocationDate: Date!
    $receivingDate: Date!
    $listedDate: Date!
    $images: [ImageInCreateProjectByAdminArgs!]!
    $docs: [DocInCreateProjectByAdminArgs!]!
    $officialInfos: [OfficialInfoInCreateProjectByAdminArgs!]!
  ) {
    createProjectByAdmin(
      name: $name
      zip: $zip
      address: $address
      addressDetail: $addressDetail
      latitude: $latitude
      longitude: $longitude
      zoning: $zoning
      mainPurpose: $mainPurpose
      grossFloorAreaMeter: $grossFloorAreaMeter
      grossFloorAreaPyeong: $grossFloorAreaPyeong
      buildingCoverageRatio: $buildingCoverageRatio
      floorAreaRatio: $floorAreaRatio
      officialLandPrice: $officialLandPrice
      completionDate: $completionDate
      lessee: $lessee
      leaseStartedAt: $leaseStartedAt
      leaseEndedAt: $leaseEndedAt
      url: $url
      tabsName: $tabsName
      totalPublicOfferingAmount: $totalPublicOfferingAmount
      publicOfferingPrice: $publicOfferingPrice
      publicOfferingQuantity: $publicOfferingQuantity
      issuer: $issuer
      publicOfferingStartedAt: $publicOfferingStartedAt
      publicOfferingEndedAt: $publicOfferingEndedAt
      allocationDate: $allocationDate
      receivingDate: $receivingDate
      listedDate: $listedDate
      images: $images
      docs: $docs
      officialInfos: $officialInfos
    ) {
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
      createdAt
    }
  }
`);
