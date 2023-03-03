import { VoteStatus } from '../graphql/generated/graphql';

export const voteStatusToText = (kind: VoteStatus) => {
  switch (kind) {
    case VoteStatus.None:
      return undefined;
    case VoteStatus.SellVoteComplete:
      return '매각투표 완료';
    case VoteStatus.SellVoteWait:
      return '매각투표 예정';
    case VoteStatus.SellVoting:
      return '매각투표 중';
  }
};
