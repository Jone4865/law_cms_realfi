import { gql } from '../generated';

export const FIND_MANY_NOTICE_BY_ADMIN = gql(/* GraphQL */ `
  query findManyNoticeByAdmin($take: Int!, $searchText: String!, $cursorId: Int!) {
    findManyNoticeByAdmin(take: $take, searchText: $searchText, cursorId: $cursorId) {
      totalCount
      notices {
        id
        noticeKind
        title
        content
        createdAt
        admin {
          name
        }
      }
    }
  }
`);

// // 요청 분기점
// const [findManyNoticeByAdmin, { loading }] = useLazyQuery(
//   FIND_MANY_NOTICE_BY_ADMIN,
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
//   findManyNoticeByAdmin({
//     variables: {
//       take,
//       skip,
//       searchText,
//     },
//   });
