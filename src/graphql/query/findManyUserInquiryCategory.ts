import { gql } from '../generated';

export const FIND_MANY_USER_INQUIRY_CATEGORY = gql(/* GraphQL */ `
  query findManyUserInquiryCategory {
    findManyUserInquiryCategory {
      id
      name
    }
  }
`);
