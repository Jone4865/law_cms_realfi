import { gql } from '../generated';

export const FIND_PROJECT_FILE = gql(/* GraphQL */ `
  query findProjectFile($id: Int!) {
    findProjectFile(id: $id) {
      id
      fileKind
      name
      fileName
    }
  }
`);

// // 요청 분기점
// const [findProjectFile, { loading }] = useLazyQuery(
//   FIND_PROJECT_FILE,
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
//   findProjectFile({
//     variables: {
//       id:projectId
//     },
//   });
