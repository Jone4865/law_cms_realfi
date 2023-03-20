import { gql } from '../generated/gql';

export const EXTEND_PUBLIC_OFFERING_BY_ADMIN = gql(/* GraphQL */ `
  mutation extendPublicOfferingByAdmin($id: Int!, $newEndedAt: Date!) {
    extendPublicOfferingByAdmin(id: $id, newEndedAt: $newEndedAt)
  }
`);
