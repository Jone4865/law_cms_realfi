import { gql } from '../generated';

export const FIND_MANY_TABS_WALLET_BY_ADMIN = gql(/* GraphQL */ `
  query findManyTabsWalletByAdmin($take: Int!, $skip: Int!, $searchText: String!, $email: String!) {
    findManyTabsWalletByAdmin(take: $take, skip: $skip, searchText: $searchText, email: $email) {
      totalCount
      tabsWallets {
        tabsCount
        averagePurchasePrice
        project {
          id
          name
        }
      }
    }
  }
`);
