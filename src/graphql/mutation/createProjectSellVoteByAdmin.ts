import { gql } from '../generated';

export const CREATE_PROJECT_SELL_VOTE_BY_ADMIN = gql(/* GraphQL */ `
  mutation createProjectSellVoteByAdmin(
    $requestSellAmount: String!
    $sellVoteStartedAt: Date!
    $sellVoteEndedAt: Date!
    $soldDate: Date!
    $projectId: Int!
    $docs: [Upload!]!
  ) {
    createProjectSellVoteByAdmin(
      requestSellAmount: $requestSellAmount
      sellVoteStartedAt: $sellVoteStartedAt
      sellVoteEndedAt: $sellVoteEndedAt
      soldDate: $soldDate
      projectId: $projectId
      docs: $docs
    )
  }
`);

// // 요청 분기점
// const [createProjectSellVoteByAdmin, { loading }] = useMutation(CREATE_PROJECT_SELL_VOTE_BY_ADMIN, {
//   onError: (error) => {
//     notification.error({ message: error.message });
//   },
//   onCompleted: (data) => {
//     console.log(data);
//   },
// });

// // 요청 코드
// createProjectSellVoteByAdmin({
//   variables: {
//     requestSellAmount,
//     sellVoteStartedAt,
//     sellVoteEndedAt,
//     soldDate,
//     projectId,
//     docs,
//   },
// });
