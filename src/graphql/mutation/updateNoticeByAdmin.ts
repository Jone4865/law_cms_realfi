import { gql } from '../generated';

export const UPDATE_NOTICE_BY_ADMIN = gql(/* GraphQL */ `
  mutation updateNoticeByAdmin(
    $id: Int!
    $title: String!
    $noticeKind: NoticeKind!
    $content: String!
  ) {
    updateNoticeByAdmin(id: $id, title: $title, noticeKind: $noticeKind, content: $content)
  }
`);

// // 요청 분기점
// const [updateNoticeByAdmin, {}] = useMutation(UPDATE_NOTICE_BY_ADMIN, {
//   onError: (error) => {
//     notification.error({ message: error.message });
//   },
//   onCompleted: (data) => {
//     console.log(data);
//   },
// });

// // 요청 코드
// updateNoticeByAdmin({
//   variables: {
//     id: 1,
//     title: 'dadwad',
//     noticeKind: NoticeKind.Info,
//     content: 'ddwawdaw',
//   },
// });
