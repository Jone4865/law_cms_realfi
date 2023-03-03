import { gql } from '../generated/gql';

export const REPLY_USER_INQUIRY_BY_ADMIN = gql(/* GraphQL */ `
  mutation replyUserInquiryByAdmin($id: Int!, $reply: String!) {
    replyUserInquiryByAdmin(id: $id, reply: $reply)
  }
`);
