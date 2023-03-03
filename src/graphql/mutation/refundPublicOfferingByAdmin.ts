import { gql } from '../generated';

export const REFUND_PUBLIC_OFFERING_BY_ADMIN = gql(/* GraphQL */ `
  mutation refundPublicOfferingByAdmin($projectId: Int!) {
    refundPublicOfferingByAdmin(projectId: $projectId)
  }
`);
