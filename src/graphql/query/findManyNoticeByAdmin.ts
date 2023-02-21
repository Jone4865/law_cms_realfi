import { gql } from '../generated';

export const FIND_MANY_NOTICE_BY_ADMIN = gql(/* GraphQL */ `
  query findManyNoticeByAdmin($take: Int!, $skip: Int!) {
    findManyNoticeByAdmin(take: $take, skip: $skip) {
      totalCount
      notices {
        id
        noticeKind
        title
        content
        createdAt
        admin {
          name
        }
      }
    }
  }
`);
