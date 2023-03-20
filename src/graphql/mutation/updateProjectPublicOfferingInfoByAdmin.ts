import { gql } from '../generated/gql';

export const UPDATE_PROJECT_PUBLIC_OFFERING_INFO_BY_ADMIN = gql(/* GraphQL */ `
  mutation updateProjectPublicOfferingInfoByAdmin(
    $id: Int!
    $totalPublicOfferingAmount: String!
    $publicOfferingPrice: String!
    $publicOfferingQuantity: Int!
    $issuer: String!
    $publicOfferingStartedAt: Date!
    $publicOfferingEndedAt: Date!
    $allocationDate: Date!
    $receivingDate: Date!
    $listedDate: Date!
  ) {
    updateProjectPublicOfferingInfoByAdmin(
      id: $id
      totalPublicOfferingAmount: $totalPublicOfferingAmount
      publicOfferingPrice: $publicOfferingPrice
      publicOfferingQuantity: $publicOfferingQuantity
      issuer: $issuer
      publicOfferingStartedAt: $publicOfferingStartedAt
      publicOfferingEndedAt: $publicOfferingEndedAt
      allocationDate: $allocationDate
      receivingDate: $receivingDate
      listedDate: $listedDate
    )
  }
`);
