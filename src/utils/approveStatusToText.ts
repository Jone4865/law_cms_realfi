import { ApproveStatus } from '../graphql/generated/graphql';

export const approveStatusToText = (kind: ApproveStatus) => {
  switch (kind) {
    case ApproveStatus.Approved:
      return '승인';
    case ApproveStatus.Rejected:
      return '반려';
    case ApproveStatus.Wait:
      return '대기';
  }
};
