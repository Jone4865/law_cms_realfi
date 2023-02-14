import { gql } from '../generated';

export const REFRESH_FROM_ADMIN = gql(/* GraphQL */ `
  mutation refreshFromAdmin {
    refreshFromAdmin {
      accessToken
      refreshToken
    }
  }
`);

// // 요청 분기점
// const [refreshFromAdmin, { loading }] = useMutation(REFRESH_FROM_ADMIN, {
//   onError: (error) => {
//     notification.error({ message: error.message });
//   },
//   onCompleted: (data) => {
//     console.log(data);
//   },
// });

// // 요청 코드
//   refreshFromAdmin();
