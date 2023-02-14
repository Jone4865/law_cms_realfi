import { gql } from '../generated';

export const FIND_MANY_FAQ_BY_ADMIN = gql(/* GraphQL */ `
  query findManyFaqByAdmin(
    $take: Int!
    $skip: Int!
    $searchText: String!
    $faqCategoryId: Int!
  ) {
    findManyFaqByAdmin(
      take: $take
      skip: $skip
      searchText: $searchText
      faqCategoryId: $faqCategoryId
    ) {
      totalCount
      faqs {
        id
        question
        answer
        createdAt
        faqCategory {
          id
          name
        }
        admin {
          name
        }
      }
    }
  }
`);

// // 요청 분기점
// const [findManyFaqByAdmin, { loading }] = useLazyQuery(
//   FIND_MANY_FAQ_BY_ADMIN,
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
//   findManyFaqByAdmin({
//     variables: {
//       take,
//       skip,
//       searchText,
//       faqCategoryId,
//     },
//   });
