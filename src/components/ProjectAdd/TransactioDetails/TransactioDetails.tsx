import { useLazyQuery } from '@apollo/client';
import { notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { FindManySignedOrderByAdminQuery } from '../../../graphql/generated/graphql';
import { FIND_MANY_SIGNED_ORDER_BY_ADMIN } from '../../../graphql/query';
import { transactioDetailsColumns } from '../../../utils/columns';
import * as S from './style';

type Props = {
  projectId: number | undefined | '';
};

export function TransactioDetails({ projectId }: Props) {
  const [transactioDetailsData, setTransactioDetailsData] =
    useState<FindManySignedOrderByAdminQuery['findManySignedOrderByAdmin']['signedOrders']>();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    findManySignedOrderByAdmin({
      variables: {
        skip,
        take,
        projectId: projectId ? projectId : 0,
      },
    });
  }, [skip, projectId]);

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const [findManySignedOrderByAdmin] = useLazyQuery(FIND_MANY_SIGNED_ORDER_BY_ADMIN, {
    onError: (error) => {
      notification.error({ message: error.message });
    },
    onCompleted: (data) => {
      setTotalCount(data.findManySignedOrderByAdmin.totalCount);
      setTransactioDetailsData(data.findManySignedOrderByAdmin.signedOrders);
    },
  });

  return (
    <S.Container>
      <S.Title>거래 내역</S.Title>
      <Table
        columns={transactioDetailsColumns({})}
        dataSource={transactioDetailsData}
        // loading={loading}
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
    </S.Container>
  );
}
