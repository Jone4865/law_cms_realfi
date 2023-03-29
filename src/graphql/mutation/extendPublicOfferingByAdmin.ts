import { gql } from '../generated/gql';

export const EXTEND_PUBLIC_OFFERING_BY_ADMIN = gql(/* GraphQL */ `
  mutation extendPublicOfferingByAdmin(
    $id: Int!
    $newEndedAt: Date!
    $newAllocationDate: Date!
    $newReceivingDate: Date!
    $newListedDate: Date!
  ) {
    extendPublicOfferingByAdmin(
      id: $id
      newEndedAt: $newEndedAt
      newAllocationDate: $newAllocationDate
      newReceivingDate: $newReceivingDate
      newListedDate: $newListedDate
    )
  }
`);
