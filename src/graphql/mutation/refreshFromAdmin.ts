import { gql } from '../generated';

export const REFRESH_FROM_ADMIN = gql(/* GraphQL */ `
  mutation refreshFromAdmin {
    refreshFromAdmin {
      accessToken
      refreshToken
    }
  }
`);
