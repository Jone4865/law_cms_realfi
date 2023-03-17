import { gql } from '../generated';

export const DELETE_PROJECT_SELL_VOTEFILE_BY_ADMIN = gql(/* GraphQL */ `
  mutation deleteProjectSellVoteFileByAdmin($id: Int!) {
    deleteProjectSellVoteFileByAdmin(id: $id)
  }
`);
