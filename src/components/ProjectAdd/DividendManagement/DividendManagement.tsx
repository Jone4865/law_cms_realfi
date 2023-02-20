import { useLazyQuery } from '@apollo/client';
import { Button, Input, notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { FindManyProjectDividendByAdminOutput } from '../../../graphql/generated/graphql';
import { FIND_MANY_PUBLIC_OFFERING_BY_ADMIN } from '../../../graphql/query';
import { FIND_MANY_PROJECT_DIVIDEND_BY_ADMIN } from '../../../graphql/query/findManyProjectDividendByAdmin';
import { dividendmanagementColumns } from '../../../utils/columns';
import * as S from './style';

type Props = {
  projectId: number | undefined | '';
};

export function DividendManagement({ projectId = 1 }: Props) {
  const [collutionHistoryData, setCollutionHistoryData] = useState<
    FindManyProjectDividendByAdminOutput[]
  >([]);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    findManyProjectDividendByAdmin({
      variables: {
        projectId: +projectId && +projectId,
        skip,
        take,
      },
    });
  }, [projectId]);

  const handlePagination = () => {};

  // // 요청 분기점
  const [findManyProjectDividendByAdmin, { loading }] = useLazyQuery(
    FIND_MANY_PROJECT_DIVIDEND_BY_ADMIN,
    {
      onError: (error) => {
        notification.error({ message: error.message });
      },
      onCompleted: (data) => {
        console.log(data);
      },
    },
  );

  return (
    <S.Container>
      <S.DividendCycle>
        <S.Title>배당 주기</S.Title>
        <Input style={{ width: '50px', height: '30px', margin: '0 5px' }} />
        <span>달</span>
        <Button type="primary" style={{ marginLeft: '10px' }}>
          저장
        </Button>
      </S.DividendCycle>
      <S.Wrap>
        <S.Title>배당정보</S.Title>
        <S.Btns>
          <Button type="primary">등록하기</Button>
        </S.Btns>
      </S.Wrap>
      <Table
        columns={dividendmanagementColumns({})}
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
