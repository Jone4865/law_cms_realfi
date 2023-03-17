import { gql } from '../generated';

export const CREATE_PROJECT_SELL_VOTE_FILE_BY_ADMIN = gql(/* GraphQL */ `
  mutation createProjectSellVoteFileByAdmin(
    $projectSellVoteId: Int!
    $file: Upload!
    $name: String!
  ) {
    createProjectSellVoteFileByAdmin(
      projectSellVoteId: $projectSellVoteId
      name: $name
      file: $file
    )
  }
`);
