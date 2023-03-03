import { gql } from '../generated/gql';

export const UPLOAD_NOTICE_FILE_BY_ADMIN = gql(/* GraphQL */ `
  mutation uploadNoticeFileByAdmin($file: Upload!) {
    uploadNoticeFileByAdmin(file: $file)
  }
`);
