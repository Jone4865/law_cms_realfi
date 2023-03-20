import { gql } from '../generated';

export const DELETE_NOTICE_BY_ADMIN = gql(/* GraphQL */ `
  mutation deleteNoticeByAdmin($id: Int!) {
    deleteNoticeByAdmin(id: $id)
  }
`);
