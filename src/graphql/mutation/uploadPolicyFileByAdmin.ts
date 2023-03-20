import { gql } from '../generated';

export const UPLOAD_POLICY_FILE_BY_ADMIN = gql(/* GraphQL */ `
  mutation uploadPolicyFileByAdmin($file: Upload!) {
    uploadPolicyFileByAdmin(file: $file)
  }
`);
