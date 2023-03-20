import React, { useEffect, useState } from 'react';
import { Input, Modal, notification, Table } from 'antd';
import { useLazyQuery } from '@apollo/client';
import { FindManyDividendByAdminQuery } from '../../graphql/generated/graphql';
import { FIND_MANY_DIVIDEND_ADMIN } from '../../graphql/query';
import { dividendListColumns } from '../../utils/columns';

type Props = {
  visible: boolean;
  projectDividendId: number;
  tabsName: string;
  handleCancel: () => void;
};

export function DividendListModal({ visible, projectDividendId, tabsName, handleCancel }: Props) {
  const [searchText, setSearchText] = useState('');
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [dividendListData, setDividendListData] = useState<
    FindManyDividendByAdminQuery['findManyDividendByAdmin']['dividends']
  >([]);

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const handleSearch = (values: { searchText?: string }) => {
    findManyDividendByAdmin({
      variables: { projectDividendId, searchText, skip, take },
      fetchPolicy: 'no-cache',
    });
    setCurrent(1);
    setSkip(0);
    setSearchText(values.searchText ?? '');
  };

  const [findManyDividendByAdmin] = useLazyQuery(FIND_MANY_DIVIDEND_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setDividendListData(data.findManyDividendByAdmin.dividends);
      setTotalCount(data.findManyDividendByAdmin.totalCount);
    },
  });

  useEffect(() => {
    findManyDividendByAdmin({
      variables: { projectDividendId, searchText, skip, take },
      fetchPolicy: 'no-cache',
    });
  }, [dividendListData]);

  return (
    <Modal open={visible} onCancel={handleCancel} width={1000} closable centered footer={false}>
      <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '30px' }}>배당 상세</p>
      <p>{tabsName}</p>
      <Input.Search
        onSearch={(e) => {
          handleSearch({ searchText: e });
        }}
        enterButton
        placeholder="검색어(이름)"
      />
      <Table
        columns={dividendListColumns}
        dataSource={dividendListData}
        scroll={{ x: 800 }}
        style={{
          marginTop: '30px',
          width: '1300px',
        }}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          onChange: handlePagination,
          onShowSizeChange: (_current, size) => setTake(size),
          total: totalCount,
          current: current,
        }}
      />
    </Modal>
  );
}
