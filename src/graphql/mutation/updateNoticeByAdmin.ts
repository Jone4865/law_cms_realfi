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
