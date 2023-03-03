import { gql } from '../generated';

export const FIND_MANY_PROJECT_SELL_VOTE_BY_ADMIN = gql(/* GraphQL */ `
  query findManyProjectSellVoteByAdmin($id: Int!) {
    findManyProjectSellVoteByAdmin(id: $id) {
      totalCount
      projectSellVotes {
        id
        no
        requestSellAmount
        sellVoteStartedAt
        sellVoteEndedAt
        soldDate
        voteKind
        favourCount
        againstCount
        undoCount
        docs {
          id
          fileKind
          name
          fileName
        }
        favourRatio
        againstRatio
        undoRatio
      }
    }
  }
`);
