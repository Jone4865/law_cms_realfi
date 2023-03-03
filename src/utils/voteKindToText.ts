import { VoteKind, VoteStatus } from '../graphql/generated/graphql';

export const voteKindToText = (kind: VoteKind) => {
  switch (kind) {
    case VoteKind.Against:
      return '반대';
    case VoteKind.Favour:
      return '찬성';
  }
};
