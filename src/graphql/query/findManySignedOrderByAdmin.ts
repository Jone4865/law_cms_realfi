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

// // 요청 분기점
// const [findManySignedOrderByAdmin, { loading }] = useLazyQuery(
//   FIND_MANY_SIGNED_ORDER_BY_ADMIN,
//   {
//     onError: (error) => {
//       notification.error({ message: error.message });
//     },
//     onCompleted: (data) => {
//       console.log(data);
//     },
//   },
// );

// // 요청 코드
//   findManySignedOrderByAdmin({
//     variables: {
//       id:projectId
//     },
//   });
