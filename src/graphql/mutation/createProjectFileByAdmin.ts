import { gql } from '../generated';

export const CREATE_PROJECT_FILE_BY_ADMIN = gql(/* GraphQL */ `
  mutation createProjectFileByAdmin(
    $projectId: Int!
    $fileKind: FileKind!
    $file: Upload!
    $name: String
  ) {
    createProjectFileByAdmin(projectId: $projectId, name: $name, fileKind: $fileKind, file: $file)
  }
`);
