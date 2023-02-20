import { useLazyQuery } from '@apollo/client';
import { Button, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { PublicOfferingInFindManyPublicOfferingByAdminOutput } from '../../../graphql/generated/graphql';
import { FIND_MANY_PUBLIC_OFFERING_BY_ADMIN } from '../../../graphql/query';
import { transactioDetailsColumns } from '../../../utils/columns';
import * as S from './style';

type Props = {
  projectId: number | undefined | '';
};

export function TransactioDetails({ projectId }: Props) {
  const [collutionHistoryData, setCollutionHistoryData] = useState<
    PublicOfferingInFindManyPublicOfferingByAdminOutput[]
  >([]);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [cursorId, setCursorId] = useState(0);

  useEffect(() => {
    findManyPublicOfferingByAdmin({
      variables: {
        cursorId,
        take,
        projectId: projectId ? projectId : 0,
      },
    });
  }, []);

  const handlePagination = () => {};

  const [findManyPublicOfferingByAdmin, { loading }] = useLazyQuery(
    FIND_MANY_PUBLIC_OFFERING_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        setTotalCount(data.findManyPublicOfferingByAdmin.totalCount);
        setCollutionHistoryData(data.findManyPublicOfferingByAdmin.publicOfferings);
      },
    },
  );

  return (
    <S.Container>
      <S.Title>공모 진행 현황</S.Title>

      <Table
        columns={transactioDetailsColumns({})}
        dataSource={collutionHistoryData}
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
