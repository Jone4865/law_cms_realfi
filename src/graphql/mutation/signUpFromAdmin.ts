import { gql } from '../generated';

export const SIGN_UP_FROM_ADMIN = gql(/* GraphQL */ `
  mutation signUpFromAdmin(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signUpFromAdmin(email: $email, password: $password, name: $name) {
      email
      name
      createdAt
      role
    }
  }
`);

// // 요청 분기점
// const [signUpFromAdmin, { loading }] = useMutation(SIGN_UP_FROM_ADMIN, {
//   onError: (error) => {
//     notification.error({ message: error.message });
//   },
//   onCompleted: (data) => {
//     console.log(data);
//   },
// });

// // 요청 코드
//   signUpFromAdmin({
//     variables: {
//       email,
//       password,
//       name,
//     },
//   });
