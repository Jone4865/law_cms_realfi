import { gql } from '../generated';

export const FIND_MANY_POLICY = gql(/* GraphQL */ `
  query findManyPolicy($take: Int!, $cursorId: Int, $policyCategoryId: Int) {
    findManyPolicy(take: $take, cursorId: $cursorId, policyCategoryId: $policyCategoryId) {
      totalCount
      policies {
        id
        title
        isRequired
      }
    }
  }
`);

// // 요청 분기점
// const [findManyPolicy, { loading }] = useLazyQuery(
//   FIND_MANY_POLICY,
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
//   findManyPolicy({
//     variables: {
//       id:projectId
//     },
//   });
