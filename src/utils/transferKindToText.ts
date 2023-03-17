import { TransferKind } from '../graphql/generated/graphql';

export const transferKindToText = (kind: TransferKind | undefined) => {
  switch (kind) {
    case TransferKind.Deposit:
      return '입금';
    case TransferKind.Withdrawal:
      return '출금';
    case TransferKind.PublicOffering:
      return '공모';
    case TransferKind.Dividend:
      return '배당';
    case TransferKind.Buy:
      return '매수';
    case TransferKind.Sell:
      return '매도';
  }
};
