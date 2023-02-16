import { gql } from '../generated';

export const CREATE_NOTICE_BY_ADMIN = gql(/* GraphQL */ `
  mutation createNoticeByAdmin($title: String!, $noticeKind: NoticeKind!, $content: String!) {
    createNoticeByAdmin(title: $title, noticeKind: $noticeKind, content: $content)
  }
`);

// // 요청 분기점
// const [createNoticeByAdmin, {}] = useMutation(CREATE_NOTICE_BY_ADMIN, {
//   onError: (error) => {
//     notification.error({ message: error.message });
//   },
//   onCompleted: (data) => {
//     console.log(data);
//   },
// });

// // // 요청 코드
// createNoticeByAdmin({
//   variables: {
//     title,
//     noticeKind,
//     content,
//   },
// });