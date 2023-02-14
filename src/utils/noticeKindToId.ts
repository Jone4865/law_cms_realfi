import { NoticeKind } from '../graphql/generated/graphql';

export const noticeKindToText = (kind: NoticeKind) => {
  switch (kind) {
    case NoticeKind.Info:
      return '공지/안내';
    case NoticeKind.Benefit:
      return '공지/혜택';
    case NoticeKind.Event:
      return '공지/이벤트';
    case NoticeKind.PublicOffering:
      return '공모';
    case NoticeKind.SellVote:
      return '매각투표';
    case NoticeKind.Transaction:
      return '거래';
  }
};
