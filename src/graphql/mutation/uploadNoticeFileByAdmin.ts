import { gql } from '../generated/gql';

export const UPLOAD_NOTICE_FILE_BY_ADMIN = gql(/* GraphQL */ `
  mutation uploadNoticeFileByAdmin($file: Upload!) {
    uploadNoticeFileByAdmin(file: $file)
  }
`);

// // 요청 분기점
// const [uploadNoticeFileByAdmin, { loading }] = useMutation(UPLOAD_NOTICE_FILE_BY_ADMIN, {
//   onError: (error) => {
//     notification.error({ message: error.message });
//   },
//   onCompleted: (data) => {
//     console.log(data);
//   },
// });

// // 요청 코드
//   uploadNoticeFileByAdmin({
//     variables: {
//       file
//     },
//   });
