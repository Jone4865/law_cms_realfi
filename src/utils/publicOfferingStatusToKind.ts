import { PublicOfferingStatus } from '../graphql/generated/graphql';

export const publicOfferingStatusToKind = (text: string) => {
  switch (text) {
    case '공모 실패':
      return PublicOfferingStatus.Failure;
    case '공모중':
      return PublicOfferingStatus.Offering;
    case '공모완료':
      return PublicOfferingStatus.Success;
    case '공모예정':
      return PublicOfferingStatus.Wait;
  }
};
