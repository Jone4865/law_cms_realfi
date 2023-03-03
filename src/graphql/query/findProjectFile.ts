import { gql } from '../generated';

export const FIND_PROJECT_FILE = gql(/* GraphQL */ `
  query findProjectFile($id: Int!) {
    findProjectFile(id: $id) {
      id
      fileKind
      name
      fileName
    }
  }
`);
