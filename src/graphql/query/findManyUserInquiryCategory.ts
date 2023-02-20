import { gql } from '../generated';

export const FIND_MANY_USER_INQUIRY_CATEGORY = gql(/* GraphQL */ `
  query findManyUserInquiryCategory {
    findManyUserInquiryCategory {
      id
      name
    }
  }
`);

// // 요청 분기점
// const [findManyUserInquiryCategory, { loading }] = useLazyQuery(
//   FIND_MANY_USER_INQUIRY_CATEGORY,
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
//   findManyUserInquiryCategory({
//     variables: {
//       id,
//       name,
//     },
//   });
