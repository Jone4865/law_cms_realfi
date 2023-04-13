import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { message } from 'antd';
import { createUploadLink } from 'apollo-upload-client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { SetterOrUpdater } from 'recoil';
import { userTokenTypes } from '../recoil/atoms/userToken';

export const SERVER =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001/graphql'
    : process.env.REACT_APP_SERVER;
export const SOCKET =
  process.env.NODE_ENV === 'development'
    ? 'ws://localhost:8001/subscriptions'
    : process.env.REACT_APP_SOCKET_URL!;

function apolloClient(state: userTokenTypes, setState: SetterOrUpdater<userTokenTypes>) {
  const uploadLink = createUploadLink({
    uri: SERVER,
    credentials: 'include',
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: SOCKET,

    }),
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);

      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    uploadLink,
  );

  const authMiddleware = new ApolloLink((operation, forward) => {
    const accessToken = state.accessToken ?? localStorage.getItem('accessToken') ?? '';

    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }: any) => {
    const unauthorizedError =
      graphQLErrors && graphQLErrors.find((item: any) => item.message === 'Unauthorized');

    if (unauthorizedError) {
      message.error('장기간 사용하지 않아 자동 로그아웃되었습니다.');

      setState({
        accessToken: null,
      });
      localStorage.removeItem('accessToken');
    }

    if (networkError) {
      message.error('네트워크 상태가 올바르지 않습니다.');
    }
  });

  const client = new ApolloClient({
    link: ApolloLink.from([authMiddleware, errorLink, splitLink]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
    credentials: 'includes',
  });

  return client;
}

export default apolloClient;
