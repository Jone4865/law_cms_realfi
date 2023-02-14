import 'antd/dist/antd.less';
import Root from './router';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import apolloClient from './config/apolloClient';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userTokenState, userTokenTypes } from './recoil/atoms/userToken';
import Loader from './components/Loader';

function App() {
  const [client, setClient] = useState<ApolloClient<any>>();
  const [state, setState] = useRecoilState<userTokenTypes>(userTokenState);

  useEffect(() => {
    const _client = apolloClient(state, setState);

    setClient(_client);
  }, [state.accessToken]);

  if (!client) {
    return <Loader />;
  }

  return (
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  );
}

export default App;
