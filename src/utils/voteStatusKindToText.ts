import { VoteStatus } from '../graphql/generated/graphql';

export const voteStatusKindToText = (text: string) => {
  switch (text) {
    case '계획 없음':
      return VoteStatus.None;
    case '매각투표완료':
      return VoteStatus.SellVoteComplete;
    case '매각투표예정':
      return VoteStatus.SellVoteWait;
    case '매각투표중':
      return VoteStatus.SellVoting;
  }
};
