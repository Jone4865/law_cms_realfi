import { gql } from '../generated/gql';

export const UPDATE_VOTE_KIND_BY_ADMIN = gql(/* GraphQL */ `
  mutation updateVoteKindByAdmin($projectId: Int!, $voteKind: VoteKind!) {
    updateVoteKindByAdmin(projectId: $projectId, voteKind: $voteKind) {
      id
    }
  }
`);

// // 요청 분기점
// const [updateVoteKindByAdmin, { loading }] = useMutation(UPDATE_VOTE_KIND_BY_ADMIN, {
//   onError: (error) => {
//     notification.error({ message: error.message });
//   },
//   onCompleted: (data) => {
//     console.log(data);
//   },
// });

// // 요청 코드
//   updateVoteKindByAdmin({
//     variables: {
//       projectId,
//       voteKind,
//     },
//   });
