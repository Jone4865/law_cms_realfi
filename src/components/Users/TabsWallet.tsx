import { useLazyQuery } from '@apollo/client';
import { Form, Input, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import {
  FindManyTabsWalletByAdminOutput,
  TabsWalletInFindManyTabsWalletByAdminOutput,
} from '../../graphql/generated/graphql';
import { FIND_MANY_TABS_WALLET_BY_ADMIN } from '../../graphql/query/findManyTabsWalletByAdmin';
import { tabsWalletClumns } from '../../utils/columns';
import * as S from './style';
import { UserDividendModal } from './UserDividendModal/UserDividendModal';
// import { UserTransactionModal } from './UserTransactionModal/UserTransactionModal';

type Props = {
  email: string | undefined;
};

export function TabsWallet({ email }: Props) {
  const [dividendModalView, setDividendModalView] = useState(false);
  // const [transactionModalView, setTransactionModalView] = useState(false);
  const [tabsWalletData, setTabsWalletData] =
    useState<FindManyTabsWalletByAdminOutput['tabsWallets']>();
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [projectId, setProjectId] = useState(0);

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const handleSearch = (e: string) => {
    setSearchText(e);
  };

  const handleCancel = () => {
    setDividendModalView(false);
    // setTransactionModalView(false);
  };

  const handleClickRow = (rec: TabsWalletInFindManyTabsWalletByAdminOutput) => {
    setProjectId(rec.project.id);
  };

  const [findManyTabsWalletByAdmin] = useLazyQuery(FIND_MANY_TABS_WALLET_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setTotalCount(data.findManyTabsWalletByAdmin.totalCount);
      setTabsWalletData(data.findManyTabsWalletByAdmin.tabsWallets);
    },
  });

  useEffect(() => {
    findManyTabsWalletByAdmin({
      variables: {
        email: email ? email : '',
        searchText,
        skip,
        take,
      },
    });
  }, [email, searchText, take]);

  return (
    <div>
      {dividendModalView && (
        <UserDividendModal
          email={email ? email : ''}
          handleCancel={handleCancel}
          visible={dividendModalView}
          projectId={projectId}
        />
      )}
      {/* {transactionModalView && (
        <UserTransactionModal handleCancel={handleCancel} visible={transactionModalView} />
      )} */}
      <S.SubTitle>보유부동산</S.SubTitle>
      <Form layout="inline">
        <Form.Item name="searchText">
          <Input.Search
            onSearch={(e) => {
              handleSearch(e);
            }}
            enterButton
            placeholder="검색어(부동산명)"
          />
        </Form.Item>
      </Form>
      <Table
        columns={tabsWalletClumns({ setDividendModalView })}
        dataSource={tabsWalletData}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
        // loading={loading}
        style={{
          marginTop: 30,
        }}
        scroll={{ x: 800 }}
        onRow={(rec) => {
          return {
            onClick: () => handleClickRow(rec),
          };
        }}
      />
    </div>
  );
}
