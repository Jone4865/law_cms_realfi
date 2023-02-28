import { gql } from '../generated';

export const FIND_MANY_SELL_VOTE_BY_ADMIN = gql(/* GraphQL */ `
  query findManySellVoteByAdmin($take: Int!, $skip: Int!, $projectSellVoteId: Int!) {
    findManySellVoteByAdmin(take: $take, skip: $skip, projectSellVoteId: $projectSellVoteId) {
      totalCount
      sellVotes {
        id
        voteKind
        tabsCount
        createdAt
        user {
          name
          phone
        }
      }
    }
  }
`);
