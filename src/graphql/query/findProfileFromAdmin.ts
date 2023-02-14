import { gql } from '../generated';

export const FIND_PROFILE_FROM_ADMIN = gql(/* GraphQL */ `
  query findProfileFromAdmin {
    findProfileFromAdmin {
      email
      name
      createdAt
      role
    }
  }
`);

// // 요청 분기점
// const [findProfileFromAdmin, { loading }] =
//     useLazyQuery(FIND_PROFILE_FROM_ADMIN, {
//       onError: (error) => {
//         notification.error({ message: error.message });
//       },
//       onCompleted: (data) => {
//         console.log(data);
//       },
//     });

// // 요청 코드
//     findProfileFromAdmin();
