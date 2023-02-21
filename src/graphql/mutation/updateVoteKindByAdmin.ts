import { gql } from '../generated/gql';

export const UPDATE_VOTE_KIND_BY_ADMIN = gql(/* GraphQL */ `
  mutation updateVoteKindByAdmin($projectId: Int!, $voteKind: VoteKind!) {
    updateVoteKindByAdmin(projectId: $projectId, voteKind: $voteKind) {
      id
    }
  }
`);
