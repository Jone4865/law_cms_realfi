import { gql } from '../generated/gql';

export const REPLY_USER_INQUIRY_BY_ADMIN = gql(/* GraphQL */ `
  mutation replyUserInquiryByAdmin($id: Int!, $reply: String!) {
    replyUserInquiryByAdmin(id: $id, reply: $reply)
  }
`);

// 요청 분기점
// const [replyUserInquiryByAdmin, {  }] = useMutation(REPLY_USER_INQUIRY_BY_ADMIN, {
//   onError: (error) => {
//     notification.error({ message: error.message });
//   },
//   onCompleted: (data) => {
//     console.log(data);
//   },
// });

// // 요청 코드
//   variables: {
//     id
// reply
//   },
