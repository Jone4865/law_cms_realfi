import { gql } from '../generated/gql';

export const UPDATE_PROJECT_BASIC_INFO_BY_ADMIN = gql(/* GraphQL */ `
  mutation updateProjectBasicInfoByAdmin(
    $id: Int!
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
  ) {
    updateProjectBasicInfoByAdmin(
      id: $id
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
    )
  }
`);
