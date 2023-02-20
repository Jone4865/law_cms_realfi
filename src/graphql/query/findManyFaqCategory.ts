import { gql } from '../generated';

export const FIND_MANY_FAQ_CATEGORY = gql(/* GraphQL */ `
  query findManyFaqCategory {
    findManyFaqCategory {
      id
      name
    }
  }
`);

// // 요청 분기점
// const [findManyFaqCategory, { loading }] = useLazyQuery(
//   FIND_MANY_FAQ_CATEGORY,
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
