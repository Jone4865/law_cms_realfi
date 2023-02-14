import { gql } from '../generated';

export const FIND_MANY_USERS_BY_ADMIN = gql(/* GraphQL */ `
  query findManyUserByAdmin($take: Int!, $skip: Int!) {
    findManyUserByAdmin(take: $take, skip: $skip) {
      totalCount
      users {
        email
        name
        phone
        createdAt
        possibleInvestmentAmount
        isExistAccount
        birth
      }
    }
  }
`);

// // 요청 분기점
// const [findManyUserByAdmin, { loading }] =
//     useLazyQuery(FIND_MANY_USERS_BY_ADMIN, {
//       onError: (error) => {
//         notification.error({ message: error.message });
//       },
//       onCompleted: (data) => {
//         console.log(data);
//       },
//     });

// // 요청 코드
//     findManyUserByAdmin({
//       variables: {
//         take,
//         skip,
//       },
//     });
