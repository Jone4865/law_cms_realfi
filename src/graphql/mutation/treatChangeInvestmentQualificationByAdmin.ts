import { gql } from '../generated/gql';

export const TREAT_CHANGE_INVESTMENT_QUILIFICATION_BY_ADMIN = gql(/* GraphQL */ `
  mutation treatChangeInvestmentQualificationByAdmin(
    $id: Int!
    $approveStatus: ApproveStatus!
    $reason: String
  ) {
    treatChangeInvestmentQualificationByAdmin(
      id: $id
      approveStatus: $approveStatus
      reason: $reason
    )
  }
`);

// 요청 분기점
// const [treatChangeInvestmentQualificationByAdmin, {}] = useMutation(
//   TREAT_CHANGE_INVESTMENT_QUILIFICATION_BY_ADMIN,
//   {
//     onError: (error) => {
//       notification.error({ message: error.message });
//     },
//     onCompleted: (data) => {
//       console.log(data);
//     },
//   },
// );

// // 요청 코드
//   treatChangeInvestmentQualificationByAdmin({
//     variables: {
//       id,
//       approveStatus,
//       reason,
//     },
//   });
