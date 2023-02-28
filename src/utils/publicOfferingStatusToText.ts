import { PublicOfferingStatus } from '../graphql/generated/graphql';

export const publicOfferingStatusToText = (kind: PublicOfferingStatus) => {
  switch (kind) {
    case PublicOfferingStatus.Failure:
      return '공모 실패';
    case PublicOfferingStatus.Offering:
      return '공모 중';
    case PublicOfferingStatus.Success:
      return '공모완료';
    case PublicOfferingStatus.Wait:
      return '공모 예정';
  }
};
