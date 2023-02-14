import { gql } from '../generated';

export const FIND_MANY_USER_INQUIRY_BY_ADMIN = gql(/* GraphQL */ `
  query findManyUserInquiryByAdmin(
    $take: Int!
    $skip: Int!
    $searchText: String!
    $userInquiryCategoryId: Int!
  ) {
    findManyUserInquiryByAdmin(
      take: $take
      skip: $skip
      searchText: $searchText
      userInquiryCategoryId: $userInquiryCategoryId
    ) {
      totalCount
      userInquiries {
        id
        title
        content
        reply
        repliedAt
        createdAt
        userInquiryCategory {
          id
          name
        }
        admin {
          name
        }
        user {
          name
          phone
        }
      }
    }
  }
`);

// // 요청 분기점
// const [findManyUserInquiryByAdmin, { loading }] = useLazyQuery(
//   FIND_MANY_USER_INQUIRY_BY_ADMIN,
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
// findManyUserInquiryByAdmin({
//   variables: {
//     take,
//     skip,
//     searchText,
//     userInquiryCategoryId,
//   },
// });
