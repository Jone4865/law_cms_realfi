import { gql } from '../generated';

export const FIND_MANY_PROJECT_FILE = gql(/* GraphQL */ `
  query findManyProjectFile($take: Int, $skip: Int, $projectId: Int!, $fileKind: FileKind) {
    findManyProjectFile(take: $take, skip: $skip, projectId: $projectId, fileKind: $fileKind) {
      id
      fileKind
      name
      fileName
    }
  }
`);
