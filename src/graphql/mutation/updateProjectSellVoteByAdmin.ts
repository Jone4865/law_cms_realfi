import { gql } from '../generated/gql';

export const UPDATE_PROJECT_SELL_VOTE_BY_ADMIN = gql(/* GraphQL */ `
  mutation updateProjectSellVoteByAdmin(
    $id: Int!
    $requestSellAmount: String!
    $sellVoteStartedAt: Date!
    $sellVoteEndedAt: Date!
    $soldDate: Date!
  ) {
    updateProjectSellVoteByAdmin(
      id: $id
      requestSellAmount: $requestSellAmount
      sellVoteStartedAt: $sellVoteStartedAt
      sellVoteEndedAt: $sellVoteEndedAt
      soldDate: $soldDate
    )
  }
`);
