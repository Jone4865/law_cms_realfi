import { gql } from '../generated';

export const FIND_USER_BY_ADMIN = gql(/* GraphQL */ `
  query findUserByAdmin($email: String!) {
    findUserByAdmin(email: $email) {
      email
      name
      birth
      phone
      createdAt
      investmentQualification {
        name
      }
      wallet {
        balance
        totalDeposit
        publicOfferingDeposit
        buyDeposit
      }
    }
  }
`);
