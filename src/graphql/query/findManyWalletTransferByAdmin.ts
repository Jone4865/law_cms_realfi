import { gql } from '../generated';

export const FIND_MANY_WALLET_TRANSFER_BY_ADMIN = gql(/* GraphQL */ `
  query findManyWalletTransferByAdmin(
    $take: Int!
    $skip: Int!
    $email: String!
    $gte: Date!
    $lt: Date!
  ) {
    findManyWalletTransferByAdmin(take: $take, skip: $skip, email: $email, gte: $gte, lt: $lt) {
      totalCount
      walletTransfers {
        id
        transferKind
        calcAmount
        createdAt
        project {
          name
        }
      }
    }
  }
`);
