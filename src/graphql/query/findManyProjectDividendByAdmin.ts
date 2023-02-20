import { gql } from '../generated';

export const FIND_MANY_PROJECT_DIVIDEND_BY_ADMIN = gql(/* GraphQL */ `
  query findManyProjectDividendByAdmin($take: Int!, $skip: Int!, $projectId: Int!) {
    findManyProjectDividendByAdmin(take: $take, skip: $skip, projectId: $projectId) {
      totalCount
      projectDividends {
        id
        name
        closingDate
        operatingProfit
        dividendPerTabs
        dividendCount
        dividendAt
      }
    }
  }
`);

// // 요청 분기점
// const [findManyProjectDividendByAdmin, { loading }] = useLazyQuery(
//   FIND_MANY_PROJECT_DIVIDEND_BY_ADMIN,
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
//   findManyProjectDividendByAdmin({
//     variables: {
//       id:projectId
//     },
//   });
