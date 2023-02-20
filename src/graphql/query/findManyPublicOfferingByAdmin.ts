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

// // 요청 분기점
// const [findManyPublicOfferingByAdmin, { loading }] = useLazyQuery(
//   FIND_MANY_PUBLIC_OFFERING_BY_ADMIN,
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
//   findManyPublicOfferingByAdmin({
//     variables: {
//       id:projectId
//     },
//   });
