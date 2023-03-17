import { gql } from '../generated';

export const REFUND_FAILED_PUBLIC_OFFERING_BY_ADMIN = gql(/* GraphQL */ `
  mutation refundFailedPublicOfferingByAdmin($projectId: Int!) {
    refundFailedPublicOfferingByAdmin(projectId: $projectId)
  }
`);
