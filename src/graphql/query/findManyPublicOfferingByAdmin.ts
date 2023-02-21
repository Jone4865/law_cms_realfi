import { gql } from '../generated';

export const FIND_MANY_PUBLIC_OFFERING_BY_ADMIN = gql(/* GraphQL */ `
  query findManyPublicOfferingByAdmin($take: Int!, $cursorId: Int, $projectId: Int!) {
    findManyPublicOfferingByAdmin(take: $take, cursorId: $cursorId, projectId: $projectId) {
      totalCount
      publicOfferings {
        id
        quantity
        isCanceled
        createdAt
        canceledAt
        name
        phone
        status
        amount
        status
      }
    }
  }
`);
