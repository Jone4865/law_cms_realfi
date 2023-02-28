import { gql } from '../generated';

export const CREATE_PROJECT_SELL_VOTE_BY_ADMIN = gql(/* GraphQL */ `
  mutation createProjectSellVoteByAdmin(
    $requestSellAmount: String!
    $sellVoteStartedAt: Date!
    $sellVoteEndedAt: Date!
    $soldDate: Date!
    $projectId: Int!
    $docs: [DocInCreateProjectSellVoteArgs!]!
  ) {
    createProjectSellVoteByAdmin(
      requestSellAmount: $requestSellAmount
      sellVoteStartedAt: $sellVoteStartedAt
      sellVoteEndedAt: $sellVoteEndedAt
      soldDate: $soldDate
      projectId: $projectId
      docs: $docs
    )
  }
`);
