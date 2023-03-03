import { gql } from '../generated';

export const FIND_PUBLIC_OFFERING_REFUND_INFO_BY_ADMIN = gql(/* GraphQL */ `
  query findPublicOfferingRefundInfoByAdmin($projectId: Int!) {
    findPublicOfferingRefundInfoByAdmin(projectId: $projectId) {
      refundQuantity
      refundAmount
      refundDate
      adminName
    }
  }
`);
