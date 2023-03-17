import { gql } from '../generated';

export const FIND_PUBLIC_OFFERING_BY_ADMIN = gql(/* GraphQL */ `
  query findPublicOfferingByAdmin($id: Int!) {
    findPublicOfferingByAdmin(id: $id) {
      quantity
      cancelQuantity
      createdAt
      canceledAt
      amount
      cancelAmount
      status
      adminName
      user {
        name
        phone
      }
    }
  }
`);
