import { MarketStatus } from '../graphql/generated/graphql';

export const marketStatusToText = (kind: MarketStatus) => {
  switch (kind) {
    case MarketStatus.Listed:
      return '마켓거래중';
    case MarketStatus.ListedWait:
      return '상장대기';
    case MarketStatus.Unlisted:
      return '미상장';
  }
};
