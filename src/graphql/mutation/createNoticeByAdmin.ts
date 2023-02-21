import { gql } from '../generated';

export const CREATE_NOTICE_BY_ADMIN = gql(/* GraphQL */ `
  mutation createNoticeByAdmin($title: String!, $noticeKind: NoticeKind!, $content: String!) {
    createNoticeByAdmin(title: $title, noticeKind: $noticeKind, content: $content)
  }
`);
