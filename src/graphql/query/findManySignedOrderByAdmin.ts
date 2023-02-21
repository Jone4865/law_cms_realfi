import { gql } from '../generated';

export const FIND_MANY_SIGNED_ORDER_BY_ADMIN = gql(/* GraphQL */ `
  query findManySignedOrderByAdmin($take: Int!, skip: Int!, $projectId: Int!) {
    findManySignedOrderByAdmin(take: $take, skip: $skip, projectId: $projectId) {
      totalCount
      signedOrders {
        id
        quantity
        createdAt
        askPrice
        fluctuation
        fluctuationRatio
        buyer
        seller
      }
    }
  }
`);
